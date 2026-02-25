import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ResponsiveProvider } from './context/ResponsiveContext';
import { SessionProvider } from './context/AuthContext';
import AppContent from './screens/AppContent';

export default function App() {


  return (
    <ResponsiveProvider>
        <SafeAreaProvider>
          <SessionProvider>
              <View style={styles.container}>
                <StatusBar style="light" />
                <AppContent/>
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

//  A faire :
  // Creation de database sur Supabase et utilisation de cette DB sur mon Home
  // Amelioration de ma page Home
  // tester en mode web + autre pour avoir les responsivites