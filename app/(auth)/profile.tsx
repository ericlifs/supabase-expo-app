import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image } from 'react-native';

import Button from '~/components/button';
import { supabase } from '~/utils/storage';

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

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const [pickedImage] = result.assets;
      const base64 = await FileSystem.readAsStringAsync(pickedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const filePath = `${user?.id}/avatar.png`;
      const contentType = 'image/png';

      try {
        await supabase.storage.from('avatars').upload(filePath, decode(base64), { contentType });
      } catch (err) {
        console.log(err);
      }
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
