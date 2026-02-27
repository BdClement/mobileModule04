// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveContext } from "../context/ResponsiveContext";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomePage from '../screens/HomePage';
import CalendarScreen from '../screens/Calendar';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// const Tab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

export default function Home() {
    const { height, width, moderateScale } = useResponsiveContext();
    const isLandscape = width > height
    return (
            <NavigationContainer>
              <Tab.Navigator screenOptions={{ 
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                      backgroundColor: "#1a1818",
                      height: isLandscape ? moderateScale(35) : moderateScale(80),
                      borderTopWidth: 0,
                    //   opacity: 0.7,
                    },
                    tabBarActiveTintColor: "#0e6f03c5",
                    tabBarInactiveTintColor: "#888",
                    tabBarIconStyle: {
                        height: moderateScale(30),
                        width: moderateScale(25),
                    },
                    tabBarItemStyle: {
                        paddingVertical: isLandscape ? moderateScale(8) : moderateScale(6),
                    },
                }}
              >
                <Tab.Screen 
                    name="Home"
                    component={HomePage}
                    options={{
                      tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome
                          name={ "home" }
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                />
                <Tab.Screen 
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                      tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                          name={ "calendar-month" }
                          size={size}
                          color={color}
                        />
                      ),
                      tabBarShowLabel: false
                    }}
                 />
              </Tab.Navigator>
            </NavigationContainer>
    )
}
// Code pour createMaterialTopTabNavigator
    //     <Tab.Navigator
    // <NavigationContainer>
    //     initialRouteName='EspacePerso'
    //     tabBarPosition="bottom"
    //     screenOptions={{
    //       swipeEnabled: true, 
    //       tabBarShowLabel: true,
    //       tabBarStyle: { backgroundColor: "rgba(0, 0, 0, 0.5)", height: moderateScale(80)},
    //       tabBarLabelStyle: { fontSize:moderateScale(6) },
    //       tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
    //       tabBarIndicatorStyle: { display: 'None' },
    //       tabBarActiveTintColor: '#fc8618ff',
    //       tabBarInactiveTintColor: '#aaa',
    //       // contentStyle: { backgroundColor: 'transparent' }
    //     }}
    //     >
    //         <Tab.Screen name="EspacePerso" component={HomePage} options={{ 
    //             tabBarIcon: ({ focused, color }) => (
    //                     <FontAwesome name="home" size={width > height ? moderateScale(8) : moderateScale(18)} color={focused ? '#fc8618ff' : '#aaa'} />
    //                 //   <AntDesign name="aim" size={width > height ? moderateScale(8) : moderateScale(18)} color={focused ? '#fc8618ff' : '#aaa'} />
    //                 ),
    //             }}
    //         />
    //         <Tab.Screen name="Calendrier" component={CalendarScreen} options={{ 
    //             tabBarIcon: ({ focused, color }) => (
    //                     <FontAwesome name="home" size={width > height ? moderateScale(8) : moderateScale(18)} color={focused ? '#fc8618ff' : '#aaa'} />
    //                 ),
    //             }}
    //         />
    //     </Tab.Navigator>
    // </NavigationContainer>
// Dependencies qui focntionne avec createMaterialTopTabNavigator
    // "dependencies": {
    //   "@react-navigation/bottom-tabs": "^7.4.9",
    //   "@react-navigation/material-top-tabs": "^7.3.8",
    //   "@react-native-async-storage/async-storage": "2.2.0",
    //   "@react-navigation/native": "^7.1.26",
    //   "@react-navigation/native-stack": "^7.9.0",
    //   "@supabase/supabase-js": "^2.93.3",
    //   "eas-cli": "^16.28.0",
    //   "expo": "~54.0.31",
    //   "expo-auth-session": "~7.0.10",
    //   "expo-crypto": "~15.0.8",
    //   "expo-dev-client": "^6.0.20",
    //   "expo-image": "^3.0.11",
    //   "expo-linking": "~8.0.11",
    //   "expo-status-bar": "~3.0.9",
    //   "react": "19.1.0",
    //   "react-dom": "19.1.0",
    //   "react-native": "0.81.5",
    //   "react-native-gesture-handler": "~2.28.0",
    //   "react-native-reanimated": "~4.1.1",
    //   "react-native-screens": "~4.16.0",
    //   "react-native-safe-area-context": "~5.6.0",
    //   "react-native-web": "^0.21.0"
    // },