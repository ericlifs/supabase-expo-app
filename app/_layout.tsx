import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';

import { supabase } from '~/utils/storage';

import '../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      const isAuthPage = segments[0] === '(auth)';

      if (session && !isAuthPage) {
        router.replace('/(auth)');
      }

      if (!session && isAuthPage) {
        router.replace('/');
      }
    }
  }, [initialized, session, segments, router]);

  return <Slot />;
}
