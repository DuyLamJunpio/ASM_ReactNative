import "react-native-gesture-handler";
import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import AddContent from "./screens/AddContent";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import EditContent from "./screens/EditContent";
import Register from "./screens/Register";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUserDad, setDataUserDad] = useState([]);
  const [dataBlogDad, setDataBlogDad] = useState([]);

  const CompDad = dataSon => {
    setDataUserDad(dataSon);
  }
  const LogOut = dataSon => {
    setIsLoggedIn(dataSon);
  }

  const CompBlogDad = dataSon => {
    setDataBlogDad(dataSon);
  }

  const checkLogin = dataBoolean => {
    setIsLoggedIn(dataBoolean);
  }

  console.log(dataUserDad);

  const InputHome = ({ navigation }) => {
    return (
      <Home navigation={navigation} />
    )
  }
  const InputRegister = ({ navigation }) => {
    return (
      <Register navigation={navigation} />
    )
  }

  const InputLogin = ({ navigation }) => {
    return (
      <Login userComp={CompDad} checkLogin={checkLogin} navigation={navigation} />
    )
  }
  const InputAddContent = ({ navigation }) => {
    return (
      <AddContent dataUser={dataUserDad} navigation={navigation} />
    )
  }

  const InputEditContent = ({ navigation }) => {
    return (
      <EditContent dataBlog={dataBlogDad} navigation={navigation} dataUser={dataUserDad} />
    )
  }

  const InputProfile = ({ navigation }) => {
    return (
      <Profile dataUser={dataUserDad} navigation={navigation} blogComp={CompBlogDad} LogOut={LogOut} />
    )
  }

  function HomeScreenOptions({ navigation }) {
    return {
      drawerLabel: "Home",
      title: "Home",
      headerRight: () => (
        <TouchableOpacity onPress={() =>

          isLoggedIn ? (
            navigation.navigate('AddContent')
          ) : (
            navigation.navigate('Login')
          )

        }>
          <MaterialIcons name="add" size={30} color="#FFF" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
      drawerIcon: () => (
        <SimpleLineIcons name="home" size={20} color="#808080" />
      )
    };
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <TouchableOpacity onPress={() => {
                  isLoggedIn ? (
                    props.navigation.navigate('Profile')
                  ) : (
                    props.navigation.navigate('Login')
                  )
                }

                }>
                  <View
                    style={{
                      height: 250,
                      width: '100%',
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "#f4f4f4",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Image
                      source={{
                        uri:

                          (isLoggedIn) ? (
                            dataUserDad.avatar
                          ) : (
                            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                          )

                      }}
                      style={{
                        height: 130,
                        width: 130,
                        borderRadius: 65
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 22,
                        marginVertical: 6,
                        fontWeight: "bold",
                        color: "#111"
                      }}
                    >

                      {
                        isLoggedIn ? (
                          dataUserDad.name
                        ) : (
                          'Login'
                        )
                      }

                    </Text>
                  </View>
                </TouchableOpacity>
                <DrawerItemList {...props} />
              </SafeAreaView>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          options={HomeScreenOptions}
          component={InputHome}
        />

        <Stack.Screen name="Profile" options={{ headerShown: false, drawerLabel: "", title: "" }} component={InputProfile} />
        <Stack.Screen name="Login" options={{ headerShown: false, drawerLabel: "", title: "" }} component={InputLogin} />
        <Stack.Screen name="AddContent" options={{ headerShown: false, drawerLabel: "", title: "" }} component={InputAddContent} />
        <Stack.Screen name="EditContent" options={{ headerShown: false, drawerLabel: "", title: "" }} component={InputEditContent} />
        <Stack.Screen name="Register" options={{ headerShown: false, drawerLabel: "", title: "" }} component={InputRegister} />

      </Drawer.Navigator>

    </NavigationContainer>
  );
}
