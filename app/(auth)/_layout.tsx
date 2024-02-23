import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

import { supabase } from '~/utils/storage';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.zinc[900],
        },
        headerTintColor: colors.white,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.zinc[900],
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => supabase.auth.signOut()} className="mr-5">
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <Ionicons name={props.focused ? 'home-sharp' : 'home-outline'} {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (props) => (
            <Ionicons name={props.focused ? 'person-sharp' : 'person-outline'} {...props} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
