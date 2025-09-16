'use client';

import React, { useContext, useEffect, useState } from 'react';
import UserDetailsContext from '@/context/UserDetailsContext';
import { supabase } from '@/services/supabaseClient';

// Provider Component
function Provider({ children }) {
  const [user, setUser] = useState(null);

  const createOrUpdateUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // ✅ Upsert instead of insert (avoids duplicate user issue)
    const { data, error } = await supabase
      .from('Users')
      .upsert(
        [{
          email: user.email,
          name: user?.user_metadata?.name,
          picture: user?.user_metadata?.picture,
        }],
        { onConflict: 'email' } )
      .select()
      .single();

    if (error) {
      console.error("Error upserting user:", error);
      return;
    }

    setUser(data);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        createOrUpdateUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Always load user on mount
    createOrUpdateUser();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default Provider;

// Hook for usage
export const useUser = () => {
  return useContext(UserDetailsContext);
};
