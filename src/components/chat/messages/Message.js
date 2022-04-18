import React from "react";
import "./Message.scss";
import moment from "moment";

const Message = ({
  message: { name, user_id, text, createdAt },
  current_uid,
}) => {
  let isUser = current_uid === user_id;
  return (
    <div className={`message ${isUser && "message__user"}`}>
      <h3>{text}</h3>

      <p>
        {name} - {moment(createdAt).fromNow()}
      </p>
    </div>
  );
};

export default Message;
