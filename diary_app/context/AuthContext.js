import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AppState, Linking, Platform } from 'react-native';
import { supabase } from '../utils/supabaseClient';

const SessionContext = createContext();

const extractTokensFromUrl = (url) => {
  try {
    const fragment = url.split('#')[1];
    if (!fragment) return null;
    const params = new URLSearchParams(fragment);
    return {
      access_token: params.get('access_token'),
      refresh_token: params.get('refresh_token'),
    };
  } catch (err) {
    console.error("Erreur parsing URL:", err);
    return null;
  }
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  console.log("SessionProvider rendu !");

  useEffect(() => {
    console.log("useEffect monté !");
    const initSession = async () => {
      console.log("initSession called !");
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.log("Erreur getting session :", error);
      else {
        console.log("Session récupéréee : ", session);
        setSession(session);
      };
    };

    initSession();
    // Listener sur les changement de sessions
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth state changed : ", _event);//session
        setSession(session);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);// Au montage

  useEffect(() => {
    let deepLinkListener;

    console.log("Config listener mobile");

    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log("URL de redirection reçu :", url);
      try {
        const tokens = extractTokensFromUrl(url);
        if (!tokens || !tokens.access_token) {
          console.log("Pas de tokens dans l'URL");
          return;
        }
        const { error } = await supabase.auth.setSession(tokens);
        if (error) {
          console.log("Erreur setSession : ", error);
        } else {
          console.log("Session set");
        }
      } catch (err) {
        console.error("Erreur ou timeout handleDeepLink:", err);
      }
    };
    deepLinkListener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      deepLinkListener?.remove();
    }
  }, []);

  return <SessionContext.Provider value={{session}}>
    {children}
  </SessionContext.Provider>;
}

export const useSupabaseSession = () => useContext(SessionContext);