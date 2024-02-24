import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, ListRenderItem, Text } from 'react-native';
import colors from 'tailwindcss/colors';

import Button from '~/components/button';
import SwipeableRow from '~/components/swipeable-row';
import TextInput from '~/components/text-input';
import { Todo } from '~/types';
import { supabase } from '~/utils/storage';

const Index = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onAddTodo = async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newTodo = {
      user_id: user?.id,
      task: todo,
      is_complete: false,
    };

    const { data } = await supabase.from('todos').insert(newTodo).select().single();

    setTodo('');
    setIsLoading(false);
    setTodos((prevTodos) => [...prevTodos, data]);
  };

  const getAllTodos = useCallback(async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (!error) {
      setTodos(data);
    }
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const updateTodo = async (todo: Todo) => {
    const { data } = await supabase
      .from('todos')
      .update({ is_complete: !todo.is_complete })
      .eq('id', todo.id)
      .select()
      .single();

    setTodos((prevTodos) =>
      prevTodos.reduce(
        (accum, item) => (item.id === data.id ? [...accum, data] : [...accum, item]),
        [] as Todo[]
      )
    );
  };

  const deleteTodo = async (todo: Todo) => {
    await supabase.from('todos').delete().eq('id', todo.id);

    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
  };

  const renderTodo: ListRenderItem<Todo> = ({ item }) => (
    <SwipeableRow todo={item} onToggle={() => updateTodo(item)} onDelete={() => deleteTodo(item)}>
      <View className="flex-row p-5 items-center">
        <Text className="flex-1 mr-4">{item.task}</Text>
        {item.is_complete && (
          <Ionicons name="checkmark-circle-outline" color={colors.lime[800]} size={24} />
        )}
      </View>
    </SwipeableRow>
  );

  return (
    <View className="flex-1">
      <View className="w-full flex flex-row bg-zinc-900 p-5">
        <TextInput value={todo} onChangeText={setTodo} className="w-auto flex-1 mr-4" />

        <Button
          onPress={onAddTodo}
          text="Add"
          disabled={!todo || isLoading}
          loading={isLoading}
          className="w-auto"
        />
      </View>

      <FlatList
        data={todos}
        contentContainerClassName="bg-zinc-700"
        ItemSeparatorComponent={() => <View className="h-px mx-5 flex-1 bg-zinc-600" />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodo}
      />
    </View>
  );
};

export default Index;
