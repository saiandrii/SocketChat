import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ChatContext } from "../context/context";
import MessagesComponent from "../components/MessagesComponent";
import Feather from "@expo/vector-icons/Feather";
import { socket } from "../util/index";

const Messages = ({ navigation, route }) => {
  const { groupName, groupId } = route.params;
  console.log(groupId);

  const { allMessages, setAllMesages } = useContext(ChatContext);
  const { user, setUser } = useContext(ChatContext);
  const { typedMessage, setTypedMessage } = useContext(ChatContext);
  console.log(user);
  const handleSendMessage = () => {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    if (user) {
      socket.emit("chatMessage", {
        typedMessage,
        groupIdentifier: groupId,
        user,
        timeData,
      });
      setTypedMessage("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    socket.emit("findGroup", groupId);
    // console.log(groupId);
    socket.on("foundGroup", (allMessages) => setAllMesages(allMessages));
  }, [socket]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF4E1" }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {allMessages && allMessages[0] ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessagesComponent item={item} user={user} />
            )}
          />
        ) : null}
      </View>
      <View
        style={{
          width: "100%",

          paddingVertical: 10,
          paddingHorizontal: 15,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            borderBottomWidth: 1,
            padding: 10,
            flex: 1,
            borderRadius: 10,
            marginRight: 10,
          }}
          value={typedMessage}
          onChangeText={(value) => {
            setTypedMessage(value);
          }}
          placeholder="message..."
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSendMessage}
          style={{
            display: typedMessage != 0 ? "flex" : "none",
            backgroundColor: "#7EACB5",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <View>
            <Feather name="send" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
