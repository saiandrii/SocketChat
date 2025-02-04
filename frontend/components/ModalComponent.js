import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import { ChatContext } from "../context/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { socket } from "../util";

const ModalComponent = () => {
  const { modalVisible, setModalVisible } = useContext(ChatContext);
  const { groupName, setGroupName } = useContext(ChatContext);

  const windowHeight = Dimensions.get("screen").height;

  const handleNewGroup = () => {
    socket.emit("newGroup", groupName);

    setModalVisible(false);
    setGroupName("");
    Keyboard.dismiss();
    console.log(groupName);
  };
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <Pressable
        onPressOut={() => setModalVisible(false)}
        activeOpacity={0.7}
        style={{
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <SafeAreaView
            style={[windowHeight > 700 ? styles.modalHigh : styles.modalLow]}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",

                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  borderRadius: 50,
                  borderBottomWidth: 1,
                  width: "60%",
                  padding: 2,
                  alignItems: "center",
                  textAlign: "center",
                }}
                maxLength={25}
                placeholder="group name"
                onChangeText={(value) => setGroupName(value)}
                value={groupName}
              />
              <View
                style={{
                  flexDirection: "row",
                  top: 40,
                }}
              >
                <Pressable onPress={() => setModalVisible(false)} style={{}}>
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      left: 100,
                    }}
                  >
                    Decline
                  </Text>
                </Pressable>
                <Pressable onPress={handleNewGroup} style={{}}>
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      left: 110,
                    }}
                  >
                    Accept
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",

                bottom: 15,
                paddingRight: 10,
              }}
            ></View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalHigh: {
    backgroundColor: "#FAF4E1",
    height: 150,

    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalLow: {
    backgroundColor: "#FAF4E1",

    flex: 0.28,
    top: "40%",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FAF4E1",
    fontSize: 18,
  },
  buttons: {
    backgroundColor: "#FABC41",
    padding: 8,

    borderRadius: 50,

    marginVertical: 15,

    alignItems: "center",
  },
});
