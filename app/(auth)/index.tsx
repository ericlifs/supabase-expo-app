import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '~/components/button';
import TextInput from '~/components/text-input';
import { supabase } from '~/utils/storage';

const Index = () => {
  const [todo, setTodo] = useState('');
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

    await supabase.from('todos').insert(newTodo).select().single();

    setIsLoading(false);
    setTodo('');
  };

  return (
    <View className="flex-1 bg-zinc-900 p-5">
      <View className="w-full flex flex-row">
        <TextInput value={todo} onChangeText={setTodo} className="w-auto flex-1 mr-4" />

        <Button
          onPress={onAddTodo}
          text="Add"
          disabled={!todo || isLoading}
          loading={isLoading}
          className="w-auto"
        />
      </View>
    </View>
  );
};

export default Index;
