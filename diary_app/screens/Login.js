import { StyleSheet , View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'expo-image'
import { useResponsiveContext } from "../context/ResponsiveContext";

export default function LoginPage() {

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
                <TouchableOpacity onPress={() => {
                    console.log('Logique a implementer');
                }}
                style={styles.loginButton}
                >
                    <Text style={styles.textLoginButton}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

// Ameliorer Button
// Implementer authentification
// Penser a la naviagtion double 