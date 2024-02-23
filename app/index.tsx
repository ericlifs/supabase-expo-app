import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { bottom } = useSafeAreaInsets();

  const onSignInPress = () => {};

  const onSignUpPress = () => {};

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-[#151515] px-5" style={{ paddingBottom: bottom }}>
        {isLoading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-10 bg-black/50 gap-3">
            <ActivityIndicator color="#fff" />
            <Text className="text-white">Loading...</Text>
          </View>
        )}

        <View className="flex-1 w-full justify-center items-center">
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholder="Email"
            className="my-1 h-12 border w-full placeholder:text-zinc-400 bg-zinc-700 border-lime-700 rounded-md p-2 text-white"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholder="Password"
            className="my-1 h-12 border w-full placeholder:text-zinc-400 bg-zinc-700 border-lime-700 rounded-md p-2 text-white"
            secureTextEntry
          />
          <TouchableOpacity
            onPress={onSignInPress}
            className="bg-lime-700 p-3 rounded-xl w-full items-center mt-4">
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onSignUpPress} className="w-full items-center mb-10">
          <Text className="text-white">Sign up instead</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default HomeScreen;
