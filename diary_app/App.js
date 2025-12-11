import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screens/Login';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ResponsiveProvider } from './context/ResponsiveContext';

export default function App() {
  return (
    // mettre les provider
    // Mettre un safeAreaView par screen et placer l'image de fond dans chaque screen
    <ResponsiveProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <LoginPage style={{flex: 1}}></LoginPage>
          {/* <Text>Open up App.js to start working on your app!</Text> */}
        </View>
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