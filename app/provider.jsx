// 'use client';

// import React, { useContext, useEffect, useState } from 'react';
// import UserDetailsContext from '@/context/UserDetailsContext';
// import { supabase } from '@/services/supabaseClient';

// function Provider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createNewUser = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     const { data: users, error } = await supabase
//       .from('Users')
//       .select('*')
//       .eq('email', user.email);

//     if (error) {
//       console.error(error);
//       setLoading(false);
//       return;
//     }

//     if (!users || users.length === 0) {
//       const { data, error } = await supabase
//         .from('Users')
//         .insert([{
//           email: user.email,
//           name: user?.user_metadata?.name,
//           picture: user?.user_metadata?.picture,
//         }])
//         .select();

//       if (error) {
//         console.error(error);
//       } else {
//         console.log("Inserted new user:", data);
//         setUser(data[0]);
//       }
//     } else {
//       setUser(users[0]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
//       createNewUser();
//     });

//     createNewUser(); // run on mount

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <UserDetailsContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserDetailsContext.Provider>
//   );
// }

// export default Provider;
// export const useUser = () => useContext(UserDetailsContext);







//using upsert instead of insert 


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
        { onConflict: 'email' } // 👈 assumes email column has UNIQUE constraint
      )
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
