import React, { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoginRedirect from "./LoginRedirect";

export default function (props) {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setChat] = useState({});
  const [rightPanelMode, setRightPanelMode] = useState("messWelcome");

  function setSelectedChat(id) {
    let chat = props.account.queues.find((i) => i.queueId == id);
    setChat(chat);
    fetchMessages();
  }

  function fetchMessages() {
    axios
      .get(
        "https://localhost:7129/api/Messages/" +
          selectedChat.queueId +
          "/10?userId=" +
          props.account.userId
      )
      .then((response) => {
        console.log(response.data[0].queueId);
        console.log(selectedChat);
        setMessages(response.data);

      });
  }

  function refetchMess() {
    fetchMessages();
  }
  return (
    <div className="panels">
      <div className="wrapper">
        <LeftPanel
          rightPanelMode={rightPanelMode}
          setRightPanelMode={setRightPanelMode}
          refetchMess={refetchMess}
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
          setLogout={props.setLogout}
        />

        <RightPanel
          rightPanelMode={rightPanelMode}
          setRightPanelMode={setRightPanelMode}
          refetchMess={refetchMess}
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
        />
      </div>
    </div>
  );
}
