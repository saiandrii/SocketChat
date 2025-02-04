const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIo = require("socket.io")(http, {
  cors: { origin: "http://10.0.2.2:3000" },
});
const PORT = 4000;

let chatGroups = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const newId = () => {
  return Math.random().toString(20).substring(2, 10);
};

socketIo.on("connection", (socket) => {
  console.log(`${socket.id} user is connected`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatGroups);
  });

  socket.on("newGroup", (groupName) => {
    chatGroups.unshift({
      id: chatGroups.length + 1,
      groupName,
      messages: [],
    });
    socket.emit("groupList", chatGroups);
  });

  socket.on("findGroup", (id) => {
    const filteredGroup = chatGroups.filter((item) => item.id === id);
    console.log(filteredGroup.messages);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });

  socket.on("chatMessage", (data) => {
    const { typedMessage, groupIdentifier, user, timeData } = data;
    const filteredGroup = chatGroups.filter(
      (item) => item.id === groupIdentifier
    );
    const newMessage = {
      id: newId(),
      text: typedMessage,
      user,
      time: `${timeData.hr}:${timeData.mins}`,
    };

    socket.to(filteredGroup[0].groupName).emit("groupMessage", newMessage);
    filteredGroup[0].messages.push(newMessage);
    socket.emit("groupList", chatGroups);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });
});

app.get("/api", (req, res) => {
  console.log(req, res);
  res.json(chatGroups);
});

http.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
