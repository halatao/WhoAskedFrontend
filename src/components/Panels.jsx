import React, { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoginRedirect from "./LoginRedirect";

export default function (props) {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setChat] = useState([]);

  function setSelectedChat(id) {
    let chat = props.account.queues.find(i => i.queueId == id);
    setChat(chat);
    fetchMessages();
  }

  function fetchMessages() {
    axios
      .get(
        "https://localhost:7129/api/Messages/" + selectedChat.queueId + "/10"
      )
      .then((response) => {
        setMessages(response.data);
      });
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  function refetch() {
    fetchMessages();
  }
  return (
    <div className="panels">
      <div className="wrapper">
        <LeftPanel
          refetch={refetch}
          account={props.account}
          logged={props.logged}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
          setLogout={props.setLogout}
        />

        <RightPanel
          refetch={refetch}
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
