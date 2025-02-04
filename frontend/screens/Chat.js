import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/context";
import ChatComponent from "../components/ChatComponent";
import ModalComponent from "../components/ModalComponent";
import { socket } from "../util";

const Chat = () => {
  const { allChats, setAllChats } = useContext(ChatContext);
  const { modalVisible, setModalVisible } = useContext(ChatContext);

  useEffect(() => {
    socket.emit("getAllGroups");
    socket.on("groupList", (groups) => {
      setAllChats(groups);
    });
  }, [socket]);

  return (
    <View
      style={{
        backgroundColor: "#FAF4E1",
        flex: 1,
      }}
    >
      {modalVisible && <ModalComponent />}

      <View
        style={{
          flex: 1,
          justifyContent: allChats.length <= 0 ? "flex-end" : null,
        }}
      >
        {allChats && allChats.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allChats}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <ChatComponent item={item} />}
          />
        ) : null}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          activeOpacity={0.8}
          style={styles.buttons}
        >
          <Text style={styles.buttonText}>create new group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    color: "#FAF4E1",
    fontSize: 18,
  },
  buttons: {
    backgroundColor: "#FABC41",
    padding: 15,

    borderRadius: 20,
    margin: 5,
    marginHorizontal: 40,
    alignItems: "center",
  },
});
