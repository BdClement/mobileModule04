import { StyleSheet , View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'expo-image'
import { useResponsiveContext } from "../context/ResponsiveContext";
import { supabase } from '../utils/supabaseClient';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';

// const redirectUri = AuthSession.makeRedirectUri({
//   useProxy: true
// });
const redirectUri = AuthSession.makeRedirectUri({
  // scheme: "diary",
  useProxy: true
});
console.log('Test affichage redirect', redirectUri);

const handleLogin = async () => {
  console.log('Logique a implementer');
  // const { data, error } =
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: redirectUri }
  });
  if (error) {
    console.log("Erreur de login Supabase : ", error);
    return;
  }
  if (!data?.url) {
    console.log("Pas d'URL de login");
    return;
  }
  console.log('No error, url OK : ', data.url);
  Linking.openURL(data.url);

  // A fairele catch de l'url pour recuperer la session
  // MANIERE NATIVE AVEC DEV BUILD
  // const result = await AuthSession.startAsync({authUrl : data.url});
  // if (result?.type === 'success') {
    // console.log("Connexion reussie");
    // Supabase gere le token et la session cote client
    // supabase.auth.getSession est maintenant utilisable
    // const {data: sessionData} = await supabase.auth.getSession();
    // console.log("Session : ", sessionData);  
  // } else {
    // console.log("Connexion error : ", result);
  // }

  // console.log('Sortie : ', result);
  console.log("Sortie de handleLogin");
};

export default function LoginPage() {
  console.log("Entree dans LoginPage");
  useEffect(() => {
    if (Platform.OS === 'web') {
      console.log("Entree dans WEB useEffect");
      // Web donc l'url est dans window.location
      const getWebSession = async () => {
        console.log("Entree dans getWebSession");
        const { data: { session }, error } = await supabase.auth.getSession();
        // Est ce que error sera levee en cas de non session ?
        if (error) console.log("Erreur session web : ", error);
        else console.log("Session web recuperee : ", session);
      };
      getWebSession();
    }
    else {
      console.log("Entree dans mobile useEffect");
      const handleDeepLink = async (event) => {
        const url = event.url;
        console.log("🔁 Redirect reçu :", url);
      
        // IMPORTANT : dire à Supabase de traiter l’URL
        const { data, error } = await supabase.auth.getSessionFromUrl({ url });
      
        if (error) {
          console.log("❌ Erreur session :", error);
          return;
        }
      
        console.log("✅ Session récupérée :", data.session);
      };
      // App ouverte via url
      const subscription = Linking.addEventListener('url', handleDeepLink);
    
      return () => {
        subscription.remove();// Nettoyage 
      };
    }
  }, []);
  
  // Ecoute des changement d'auth
  // useEffect(() => {
  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       console.log("🔐 Auth event :", event);
  //       console.log("Session :", session);
  //     }
  //   );
  
  //   return () => listener.subscription.unsubscribe();
  // }, []);

    const { height, width, moderateScale } = useResponsiveContext();
    const isLandscape = width > height

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'transparent',
      },
      welcomeSentence: {
        color: 'white',
        fontSize: isLandscape? moderateScale(36) : moderateScale(30)
      },
      textLoginButton: {
        color: 'white',
        fontSize: isLandscape? moderateScale(16) : moderateScale(14)
      },
      loginButton: {
        padding: isLandscape? moderateScale(10) : moderateScale(20),
        paddingLeft: isLandscape? moderateScale(20) : moderateScale(30),
        paddingRight: isLandscape? moderateScale(20) : moderateScale(30),
        // backgroundColor: 'white',
        borderWidth:moderateScale(2),
        borderColor: 'white',
        borderRadius: moderateScale(16),
        // fontSize: isLandscape? moderateScale(25) : moderateScale(20),
    },
      view: {
        // flex: 1,
        padding: moderateScale(20),
        margin: moderateScale(10),
        gap: isLandscape ? moderateScale(25) : moderateScale(35),
        justifyContent: 'center',
        alignItems: 'center',
      }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/Feuilles.webp')}
                contentFit="cover"
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.view}>
                <Text style={styles.welcomeSentence}>Welcome to your Diary</Text>
                <TouchableOpacity onPress={handleLogin}
                style={styles.loginButton}
                >
                    <Text style={styles.textLoginButton}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

// A la fin faire un dev build pour utiliser le comportement natif (redirection OAuth etc)

// Terminer Github redirection avec Linking 
// Faire Google redirection
// Faire page intermediraire pour laisser le chox entre Google ou Github

// Tester via Mac ?


// Fail => sdkmanager narrive pas a contacter les repo google (pb reseaus)
// Emulateur android Sans installer directement Android Studio
    // Telecharger l'outils de ligne de commande android sutdio
    // Installer le SDK minimal et l'emulateur :
        // Aller dans cmdline-tools/bin
        // Executer "./sdkmanager --sdk_root=$HOME/Android/Sdk "platform-tools" "platforms;android-33" "system-images;android-33;google_apis;x86_64" "emulator"
