import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={{session}}>
    {children}
  </SessionContext.Provider>;
}

export const useSupabaseSession = () => useContext(SessionContext);