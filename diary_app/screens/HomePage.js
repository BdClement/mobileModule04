import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image'
import { useSupabaseSession } from "../context/AuthContext";
import { useResponsiveContext } from "../context/ResponsiveContext";
import { supabase } from '../utils/supabaseClient';
import { getDisplayName, getAvatarUrl } from '../utils/utils';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ModalToFill from '../components/Modal';
import NoteCreationForm from '../components/NoteCreationForm';

const mockData = [
  { id: '1', title: 'Premier élément' },
  { id: '2', title: 'Deuxième élément' },
  { id: '3', title: 'Troisième élément' },
  { id: '4', title: 'Quatrième élément' },
  { id: '5', title: '5e élément' },
  { id: '6', title: '6e élément' },
  { id: '7', title: '7e élément' },
  { id: '8', title: '8e élément' },
];

export default function HomePage() {
    console.log("Entree dans Home");
    const { height, width, moderateScale, verticalScale, horizontalScale } = useResponsiveContext();
    const isLandscape = width > height
    const { session, user } = useSupabaseSession();
    const [modalCeationNoteVisible, setModalCeationNoteVisible] = useState(false);

    console.log("Session dans homePage = ", session);
    console.log("User dans homePage = ", user);

    const userName = getDisplayName(user);
    console.log('UserName == ', userName);

    const avatarUrl = getAvatarUrl(user);
    console.log('AvatarURL == ', avatarUrl);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      header: {
        height: isLandscape? height * 0.25 : height * 0.15,
        backgroundColor: 'rgba(3, 3, 3, 0.6)',
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: "row",
      },
      avatar: {
        width: isLandscape? moderateScale(30) : moderateScale(50),
        height: isLandscape? moderateScale(30) : moderateScale(50),
        borderRadius: 100,
      },
      username: {
        color: "white",
        fontSize: moderateScale(20),
        fontStyle: "italic",
        letterSpacing: moderateScale(1),

      },
      textButtonLogout: {
        color: 'white',
        fontSize: isLandscape? moderateScale(10) : moderateScale(14),
        borderWidth:moderateScale(2),
        borderColor: 'white',
      },
      buttonLogout: {

      },
      listContainer: {
        minHeight: isLandscape? height * 0.50 : height * 0.63,
        // borderWidth:moderateScale(1),
        // borderColor: 'white',
      },
      mainList: {
        flex: 1,
        margin: isLandscape? moderateScale(5) : moderateScale(15),
        backgroundColor: 'rgba(3, 3, 3, 0.4)',
        gap: 6,
        borderRadius: 15,
      },
      listItem: {
        backgroundColor: "#1a1818",
        height: isLandscape? moderateScale(40) : moderateScale(70),
        margin: isLandscape? moderateScale(8) : moderateScale(20),
      },
      footer: {
        height: isLandscape? height * 0.1 : height * 0.06,
        margin: moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      buttonCreate: {
        backgroundColor: "#1a1818",
        paddingVertical: isLandscape? moderateScale(4) : moderateScale(10),
        paddingHorizontal: isLandscape? moderateScale(10) : moderateScale(20),
        borderRadius: 50,
      },
      textButtonCreate: {
        color: "#2dc61c",
        fontSize: isLandscape? moderateScale(10) : moderateScale(14)
      },
    });
    const handleLogout = async () => {
      console.log('Appel a handleLogout');
      const resultLogout = await supabase.auth.signOut();
      console.log("result Logout", resultLogout);
    };

    return (
        <SafeAreaView style={styles.container}>
          <Image 
              source={require('../assets/ChemineeCosy.jpg')}
              contentFit="cover"
              style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.header}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar}/>
            ) : (
              <Image source={require('../assets/AvatarDefault.jpg')} style={styles.avatar}/>
            )}
            <Text style={styles.username}>{userName}'s Diary</Text>
            <TouchableOpacity onPress={() => handleLogout()} style={styles.buttonLogout}>
              <SimpleLineIcons name="logout" size={isLandscape? moderateScale(16) : moderateScale(14)} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
              <FlatList
              style={styles.mainList}
                data={mockData} // la source de données
                keyExtractor={(item) => item.id} // clé unique par item
                renderItem={({ item }) => (
                  <View style={styles.listItem}>
                    <Text>{item.title}</Text>
                  </View>
                )}
                contentContainerStyle={styles.listContent} // style du container interne
                ItemSeparatorComponent={() => <View style={{ height: isLandscape? moderateScale(2) : moderateScale(6)}} />} 
              />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setModalCeationNoteVisible(true)} style={styles.buttonCreate}>
              <Text style={styles.textButtonCreate}>Create new entry</Text>
            </TouchableOpacity>
          </View>
          <ModalToFill visible={modalCeationNoteVisible} onClose={() => setModalCeationNoteVisible(false)}>
                <NoteCreationForm userId={user.id} onClose={() => setModalCeationNoteVisible(false)}/>
          </ModalToFill>
        </SafeAreaView>
    )
}

// Comprendre comment utiliser des données de database dans ma liste 
// CRUD (tester bien creation + faire List, Retrieve, et Delete avec la meme logique)

    // Header avec photo / nom Bouton Logout DONE
    // Liste avec les entree (Content) DONE
    // clique sur une entrée -> Pop up presentant l'entree DONE
    // Bouton pour creer une entrée Pop up (au dessus de la bar menu) dONE
    // Bouton pour supprimer une entree lors que l'on clique dessu (dans le pop up)