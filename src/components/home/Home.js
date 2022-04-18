import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import Button from "@material-ui/core/Button";
import "./Home.scss";
import io from "socket.io-client";
import { Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import RoomList from "./RoomList";
import { Redirect } from "react-router-dom";

let socket;

const Home = () => {
  const ENDPT = "localhost:5000";
  const { user } = useContext(UserContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket = io(ENDPT);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPT]);

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);
  useEffect(() => {
    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);
  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-room", room);
    console.log(room);
    setRoom("");
  };

  return (
    <div className="home">
      <Card className="card">
        <CardHeader
          className="card__header"
          title={`Welcome ${user ? user.name : ""}`}
        />
        <CardContent className="card__content">
          <form onSubmit={handleSubmit}>
            <TextField
              className="card__input"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              label="Enter a Room Name"
            />
            <Button type="submit" className="card__button create">
              Create Room
            </Button>
          </form>
        </CardContent>
      </Card>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default Home;
