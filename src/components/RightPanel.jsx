import { React, useEffect, useState } from "react";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import GroupSettings from "./GroupSettings";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";
import useWebSocket, { ReadyState } from "react-use-websocket"

export default function (props) {
  const showMessWindow = props.rightPanelMode === "messWin";
  const showSettWindow = props.rightPanelMode === "messSett";
  const showWelcomeWindow = props.rightPanelMode === "messWelcome";

  const params = useParams();
  const queueId = params.queueId ?? 3;

  const queues = props.account?.queues ?? [];
  const allUsers = queues?.find((i) => i.queueId.toString() === queueId) ?? [];
  const users = allUsers.users;

  const [messages, setMessages] = useState([]);
  const WS_URL = "wss://localhost:7129/QueueWS?queueId=" + queueId;
  const { lastMessage } = useWebSocket(WS_URL);
  function fetchMessages(id) {
    let userId = localStorage.getItem("userId");
    axios
      .get(
        "https://localhost:7129/api/Messages/" +
          id +
          "/10?userId=" +
          userId,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        setMessages(response.data);
      });
  }

  function clickHandler(rightPanelMode) {
    if (rightPanelMode === "messSett") {
      props.setRightPanelMode("messWin");
    } else if (rightPanelMode === "messWin") {
      props.setRightPanelMode("messSett");
    }
  }

  function getButton() {
    if (props.account.userName === allUsers.ownerUsername) {
      return (
        <button
          onClick={() => {
            clickHandler(props.rightPanelMode);
          }}
        >
          Group
        </button>
      );
    }
  }

  useEffect(() => {
    if (lastMessage?.data === 'New message') {
      fetchMessages(queueId);
    }
  }, [lastMessage, queueId, props.account]);


  useEffect(() => {

    fetchMessages(queueId);
  }, [queueId, props.account]);


  return (
    <div className="second">
      <div className="rightPanelUpper">
        <div className="rightPanelUpperLabel">
          <label> {allUsers.queueName}</label>
        </div>
        <div className="rightPanelUpperSettButt">{getButton()}</div>
      </div>

      <div className="rightPanelMid">
        {showMessWindow ? (
          <div>
            <MessagesWindow
              users={users}
              account={props.account}
              messages={messages}
              refetchMess={props.refetchMess}
              refetchAcc={props.refetchAcc}
            />
            <div className="rightPanelLower">
              <MessageSend
                refetchMess={() => fetchMessages(queueId)}
                refetchAcc={props.refetchAcc}
                senderId={props.account?.userId}
              />
            </div>
          </div>
        ) : null}
        {showSettWindow ? (
          <GroupSettings account={props.account} messages={props.messages} />
        ) : null}

        {showWelcomeWindow ? <h1>WELCOME</h1> : null}
      </div>
    </div>
  );
}
