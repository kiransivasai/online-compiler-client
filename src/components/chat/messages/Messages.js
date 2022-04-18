import React from "react";
import Message from "./Message";
import "./Messages.scss";
import STB from "react-scroll-to-bottom";

const Messages = ({ messages, user_id }) => {
  return (
    <STB className="messages" id="messageContainerBody">
      {messages.map((message) => (
        <Message key={message._id} message={message} current_uid={user_id} />
      ))}
    </STB>
  );
};

export default Messages;
