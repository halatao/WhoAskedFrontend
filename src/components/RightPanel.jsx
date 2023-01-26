import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import axios from "axios";

export default function (props) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="second">
      <div className="rightPanelUpper">
        User: {props.selectedUser?.queueName}
      </div>
      <div className="rightPanelMid">
        <MessagesWindow
          allUsers={allUsers}
          messages={props.messages}
        ></MessagesWindow>
      </div>
      <div className="rightPanelLower">
        <MessageSend
          refetch={props.refetch}
          queueId={props.selectedChat?.idChat}
          senderId={props.account?.idUser}
        />
      </div>
    </div>
  );
}
