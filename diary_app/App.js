import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screens/Login';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ResponsiveProvider } from './context/ResponsiveContext';
import { SessionProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function App() {


  return (
    // mettre les provider
    // Mettre un safeAreaView par screen et placer l'image de fond dans chaque screen
    <ResponsiveProvider>
        <SafeAreaProvider>
          <SessionProvider>
            <NavigationContainer>
              <View style={styles.container}>
                <StatusBar style="light" />
                {/* <LoginPage style={{flex: 1}}></LoginPage> */}
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={LoginPage} />
                  {/* <Stack.Screen name="Choice" component={ChoicePage} />
                  <Stack.Screen name="Home" component={HomePage} /> */}
                </Stack.Navigator>
              </View>
            </NavigationContainer>
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

  // https://auth.expo.io/@BdClement/diary_app