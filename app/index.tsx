import { Stack } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '~/components/button';
import TextInput from '~/components/text-input';
import { supabase } from '~/utils/storage';

function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { bottom } = useSafeAreaInsets();

  const onSignInPress = useCallback(async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert(error.message);
    }

    setIsLoading(false);
  }, [email, password]);

  const onSignUpPress = useCallback(async () => {
    setIsLoading(true);

    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
    }

    if (!session) {
      Alert.alert('Check your email for the confirmation link.');
    }

    setIsLoading(false);
  }, [email, password]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-zinc-900 px-5" style={{ paddingBottom: bottom + 40 }}>
        {isLoading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-10 bg-black/50 gap-3">
            <ActivityIndicator color="#fff" />
            <Text className="text-white">Loading...</Text>
          </View>
        )}

        <View className="flex-1 w-full justify-center items-center">
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Button onPress={onSignInPress} text="Sign In" className="mt-4" />
        </View>

        <View className="flex items-center justify-center">
          <TouchableOpacity onPress={onSignUpPress} className="w-full items-center mt-5">
            <Text className="text-white">Sign up instead</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default HomeScreen;
