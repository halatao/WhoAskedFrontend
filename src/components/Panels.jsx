import React, { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function (props) {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  function setSelectedChat(id) {
    navigate("/test/" + id, { replace: true });
  }

  const account = props.account;
  const selectedChat = account?.chats?.find((i) => i.idChat == params.id);

  function fetchMessages() {
    //debugger;
    if (!selectedChat) {
      return;
    }
    axios
      .get("https://localhost:7214/api/Messages/" + selectedChat.idChat + "/10")
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
