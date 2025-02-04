import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";
import Messages from "./screens/Messages";
import MainPage from "./screens/MainPage";
import { Context } from "./context/context";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={MainPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Chat"
            component={Chat}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Messages"
            component={Messages}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
