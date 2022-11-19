import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import axios from "axios";

export default function (props) {
  const [allUsers, setAllUsers] = useState([]);

  /**
   * TODO filter na data co potřebujeme / jen uživatele se kterými jsem měl kdy chat
   */
  function fetchAllUsers() {
    axios.get("https://localhost:7214/api/Users/").then((response) => {
      setAllUsers(response.data);
    });
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const selectedUser = allUsers?.find((i) =>
    i.chats?.find((j) => j.idChat === props.selectedChat?.idChat)
  );

  return (
    <div className="second">
      <div className="rightPanelUpper">User: {selectedUser?.username}</div>
      <div className="rightPanelMid">
        <MessagesWindow
          allUsers={allUsers}
          messages={props.messages}
        ></MessagesWindow>
      </div>
      <div className="rightPanelLower">
        <Col>
          <MessageSend
            refetch={props.refetch}
            queueId={props.selectedChat?.idChat}
            senderId={props.account?.idUser}
          />
        </Col>
      </div>
    </div>
  );
}
