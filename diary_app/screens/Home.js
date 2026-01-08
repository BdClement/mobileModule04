import { StyleSheet, Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSupabaseSession } from "../context/AuthContext";
import { useResponsiveContext } from "../context/ResponsiveContext";
import { supabase } from '../utils/supabaseClient';

export default function HomePage() {
    console.log("Entree dans Home");
    const { height, width, moderateScale } = useResponsiveContext();
    const isLandscape = width > height
    const { session } = useSupabaseSession();

    console.log("Session dans home = ", session);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10)
      },
        textButton: {
        color: 'black',
        fontSize: isLandscape? moderateScale(16) : moderateScale(14)
      },
      Button: {
        padding: isLandscape? moderateScale(10) : moderateScale(20),
        paddingLeft: isLandscape? moderateScale(20) : moderateScale(30),
        paddingRight: isLandscape? moderateScale(20) : moderateScale(30),
        borderWidth:moderateScale(2),
        borderColor: 'black',
      },
    });
    const handleLogout = async () => {
      console.log('Appel a handleLogout');
      const resultLogout = await supabase.auth.signOut();
      console.log("result Logout", resultLogout);
      console.log("Sortie de handleLogout");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Ceci est mon Home User</Text>
            <TouchableOpacity onPress={() => handleLogout()}
            style={styles.Button}
            >
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// Implementer la deconnexion ici avec un bouton Logout
// Ameliorer la page Logout
// Faire la database user 