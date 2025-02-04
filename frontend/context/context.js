import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
const ChatContext = createContext();
const Context = ({ children }) => {
  const [loginView, setLoginView] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMesages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");

  return (
    <ChatContext.Provider
      value={{
        allMessages,
        setAllMesages,
        loginView,
        setLoginView,
        userName,
        setUserName,
        user,
        setUser,
        allUsers,
        setAllUsers,
        allChats,
        setAllChats,
        modalVisible,
        setModalVisible,
        groupName,
        setGroupName,
        messages,
        setMessages,
        typedMessage,
        setTypedMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, Context };

const styles = StyleSheet.create({});
