import React from "react";
import { Link } from "react-router-dom";
import Room from "./Room";

const RoomList = ({ rooms }) => {
  return (
    <div className="room__list" style={{ flex: 0.5 }}>
      {rooms &&
        rooms.map((room) => (
          <Link to={"/room/" + room._id + "/" + room.name} key={room._id}>
            <Room key={room._id} name={room.name}></Room>
          </Link>
        ))}
    </div>
  );
};

export default RoomList;
