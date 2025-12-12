import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screens/Login';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ResponsiveProvider } from './context/ResponsiveContext';
// import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { SessionProvider } from './context/AuthContext';


// const redirectUri = AuthSession.makeRedirectUri({
//   useProxy: true
// });
// console.log('Test affichage redirect', redirectUri);

export default function App() {


  return (
    // mettre les provider
    // Mettre un safeAreaView par screen et placer l'image de fond dans chaque screen
    <ResponsiveProvider>
        <SafeAreaProvider>
          <SessionProvider>
            <View style={styles.container}>
              <StatusBar style="light" />
              <LoginPage style={{flex: 1}}></LoginPage>
              {/* <Text>Open up App.js to start working on your app!</Text> */}
            </View>
          </SessionProvider>
        </SafeAreaProvider>
    </ResponsiveProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Pour le systeme d'authentification j'ai choisi Supabase car solution moderne compatbible avec RN / Expo Go
  // Cree un projet sur le dashboard Supabase


// Mise en place de la solution :
  // - Creer un contexte pour l'auth
  // - Creer 2 Stacks (ou autre) pour gerer redirection a la page Login Si connecte => Profile
        // Et une a lentree dans l'application Navigation etant connecte


// A Faire :
  // -Creer un compte expo DONE
  // -Se connecter a ce compte sur Expo Go (telephone) DONE
  // - Setup Github redirect vers https://auth.expo.io/@username/slug qui sert de proxy vers mon app en localhost

  // https://auth.expo.io/@BdClement/diary_app