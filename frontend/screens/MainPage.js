import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Front from "../assets/Front.jpg";
import { ChatContext } from "../context/context";
import { useNavigation } from "@react-navigation/native";

const MainPage = () => {
  const { loginView, setLoginView } = useContext(ChatContext);
  const { userName, setUserName } = useContext(ChatContext);
  const { user, setUser } = useContext(ChatContext);
  const { allUsers, setAllUsers } = useContext(ChatContext);

  const navigation = useNavigation();

  const handleRegister = (isLogin) => {
    if (userName.trim() !== "") {
      const index = allUsers.findIndex((item) => item === userName);
      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register");
        } else {
          setUserName(userName);
        }
      } else {
        if (index === -1) {
          allUsers.push(userName);
          setAllUsers(allUsers);
          setUser(userName);
        } else {
          Alert.alert("Already registered");
        }
      }
      setUserName("");
    } else {
      Alert.alert("Field is empty");
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (user.length !== 0) {
      if (user.trim() !== "") navigation.navigate("Chat");
    }
  }, [user]);

  console.log(user.length);
  return (
    <View
      style={{
        backgroundColor: "#FAF4E1",
        flex: 1,
      }}
    >
      {loginView ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingLeft: 1,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 30 }}
            >
              enter your username
            </Text>
            <TextInput
              style={{
                borderRadius: 50,
                borderBottomWidth: 1,
                padding: 2,
                alignItems: "center",
                textAlign: "center",
              }}
              maxLength={25}
              placeholder="username"
              onChangeText={(value) => setUserName(value)}
              value={userName}
            />
          </View>
          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            <Pressable
              onPress={() => handleRegister(false)}
              style={styles.buttons}
            >
              <View>
                <Text style={styles.buttonText}>Start</Text>
              </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingLeft: 1,
          }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: "bold", paddingBottom: "15" }}
          >
            start chatting now
          </Text>
          <View>
            <Pressable
              style={styles.buttons}
              onPress={() => {
                setLoginView(true);
              }}
            >
              <View>
                <Text>Get Started</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    color: "#FAF4E1",
    fontSize: 18,
  },
  buttons: {
    backgroundColor: "#FABC41",
    padding: 15,
    marginVertical: 10,
    borderRadius: 50,
    width: "30%",
    marginHorizontal: 10,
    alignItems: "center",
  },
});
