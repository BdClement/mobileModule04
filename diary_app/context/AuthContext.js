import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../utils/supabaseClient';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      if (Platform.OS === 'web') {
        console.log("Entree dans WEB useEffect");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) console.log("Erreur session web :", error);
        else setSession(session);
      } else {
        console.log("Entree dans mobile useEffect");
        const handleDeepLink = async (event) => {
          const url = event.url;
          console.log("Redirect URL reçu :", url);
          const { data: { session }, error } = await supabase.auth.getSessionFromUrl({ url });
          if (error) {
            console.log("Erreur session mobile :", error);
            return;
          }
          else setSession(session);
        
          console.log("Session récupérée :", data.session);
        };
        // App ouverte via url
        const subscription = Linking.addEventListener('url', handleDeepLink);
      
        return () => {
          subscription.remove();// Nettoyage 
        }
      }
    };
    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);// Au montage

  // const value = useMemo(() => ({ session }), [session]);
  return <SessionContext.Provider value={{session}}>
    {children}
  </SessionContext.Provider>;
}

export const useSupabaseSession = () => useContext(SessionContext);