import { Card, CardHeader } from "@material-ui/core";
import React from "react";

const Room = ({ name }) => {
  return (
    <Card style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
      <CardHeader title={name} />
    </Card>
  );
};

export default Room;
