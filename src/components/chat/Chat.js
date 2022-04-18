import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./Chat.scss";
import io from "socket.io-client";
import Messages from "./messages/Messages";
import Input from "./input/Input";
import Compiler from "../compiler/Compiler";
let socket;

const Chat = () => {
  const { user } = useContext(UserContext);
  let { room_id, room_name } = useParams();
  const ENDPT = "localhost:5000";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPT);
    socket.emit("join", { name: user.name, room_id, user_id: user._id });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.emit("get-messages-history", room_id);
    socket.on("output-messages", (messages) => {
      setMessages(messages);
    });
  }, [room_id]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("send-message", message, room_id, () => {
        setMessage("");
      });
    }
  };
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="chat">
      <Compiler room_id={room_id} />
      <div className="chat__container">
        <h1>{room_name}</h1>
        <Messages messages={messages} user_id={user._id} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
