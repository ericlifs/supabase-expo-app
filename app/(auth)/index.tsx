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
    <View className="flex-1">
      <TextInput value={todo} onChangeText={setTodo} />

      <Button onPress={onAddTodo} text="Add todo" disabled={!todo || isLoading} />
    </View>
  );
};

export default Index;
