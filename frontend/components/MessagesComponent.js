import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessagesComponent = ({ user, item }) => {
  const userStatus = item.user !== user;

  return (
    <View
      style={
        userStatus
          ? { alignContent: "flex-start", marginTop: 25 }
          : { alignItems: "flex-end", marginTop: 25 }
      }
    >
      <View
        style={{
          maxWidth: "30%",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: userStatus ? "#C96868" : "#7EACB5",
            borderRadius: 15,
            padding: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              paddingBottom: 5,
              borderRadius: 10,
              marginBottom: 2,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>
              {item.user}
            </Text>
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
          </View>
        </View>
        <View style={{ left: 5 }}>
          <Text
            style={{
              color: "grey",
              fontSize: 13,
              paddingTop: 2,
            }}
          >
            {item.time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MessagesComponent;

const styles = StyleSheet.create({});
