import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/context";
import { useNavigation } from "@react-navigation/native";

const ChatComponent = ({ item }) => {
  const navigation = useNavigation();
  const { messages, setMessages } = useContext(ChatContext);
  useEffect(() => {
    setMessages(item.item.messages.length - 1);
  });
  const navigateHandler = () => {
    console.log(item.item.groupName);
    navigation.navigate("Messages", {
      groupName: item.item.groupName,
      groupId: item.item.id,
    });
  };

  return (
    <Pressable
      onPress={navigateHandler}
      style={{
        width: "95%",
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 5,
        backgroundColor: "#FADA7A",
        height: 80,
        top: 18,
        marginTop: 15,
        marginHorizontal: 10,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            {item.item.groupName}
          </Text>
          <Text style={{ fontSize: 14, opacity: 0.8 }}>
            {item.item && item.item.messages && item.item.messages.length
              ? item.item.messages[item.item.messages.length - 1].text
              : "Let's get started..."}
          </Text>
        </View>
        <View style={{}}>
          <Text style={{ opacity: 0.6 }}>
            {item.item && item.item.messages && item.item.messages.length
              ? item.item.messages[item.item.messages.length - 1].time
              : "Now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({});
