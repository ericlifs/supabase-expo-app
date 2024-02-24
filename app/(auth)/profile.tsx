import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image } from 'react-native';

import Button from '~/components/button';

const Profile = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 px-5 items-center">
      <Image
        source={{ uri: image! }}
        className="h-24 w-24 rounded-full bg-slate-500 m-10 self-center"
      />
      <Button text="Pick avatar image" onPress={pickImage} />
    </View>
  );
};

export default Profile;
