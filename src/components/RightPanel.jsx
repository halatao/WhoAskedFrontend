import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import axios from "axios";

export default function (props) {
  useEffect(() => {}, []);

  return (
    <div className="second">
      <div className="rightPanelUpper">
        User: {props.selectedUser?.queueName}
      </div>
      <div className="rightPanelMid">
        <MessagesWindow
          account={props.account}
          allUsers={props.selectedChat.users}
          messages={props.messages}
        ></MessagesWindow>
      </div>
      <div className="rightPanelLower">
        <MessageSend
          refetch={props.refetch}
          queueId={props.selectedChat?.queueId}
          senderId={props.account?.userId}
        />
      </div>
    </div>
  );
}
