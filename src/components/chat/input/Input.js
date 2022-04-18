import React from "react";
import { Button } from "@material-ui/core";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <Button className="btn send__message" type="submit">
        Send
      </Button>
    </form>
  );
};

export default Input;
