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
        // Header avec photo / Nom (DAY 5) DONE
        // Bouton pour voir le calendrier avec les notes pour chaque jour ? (Day 5)
        // Liste avec les entees (Toutes pour l'instant ! -> 2 dernières pour le Day 5) 
        // possibilité de clique sur l'entree et d'etre dirigé vers une page de presentation de l'entree
        // Bouton pour creer une entree DONE
        // Bouton pour supprimer une entree
        // Logout Button (Day 5) DONE
        // total number of entries display (Day 5)
        // List les % de feeling (Day 5)
  // Creation de database sur Supabase et utilisation de cette DB sur mon Home DONE
  // tester en mode web + autre pour avoir les responsivites