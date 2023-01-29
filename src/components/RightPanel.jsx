import { React, useEffect, useState } from "react";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import GroupSettings from "./GroupSettings";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function (props) {
  const showMessWindow = props.rightPanelMode === "messWin";
  const showSettWindow = props.rightPanelMode === "messSett";
  const showWelcomeWindow = props.rightPanelMode === "messWelcome";

  const params = useParams();
  const queueId = params.queueId ?? 3;

  const [messages, setMessages] = useState([]);
  function fetchMessages(id) {
    axios
      .get(
        "https://localhost:7129/api/Messages/" +
          id +
          "/10?userId=" +
          props.account.userId
      )
      .then((response) => {
        console.log(response.data[0].queueId);
        setMessages(response.data);
      });
  }

  useEffect(() => {
    fetchMessages(queueId);
  }, [queueId]);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchMessages(queueId);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [queueId]);

  return (
    <div className="second">
      <div className="rightPanelUpper">
        <label> User: {props.selectedUser?.queueName}</label>
        <button
          onClick={() => {
            props.setRightPanelMode("messSett");
          }}
        >
          Settings
        </button>
      </div>

      <div className="rightPanelMid">
        {showMessWindow ? (
          <MessagesWindow
            account={props.account}
            messages={messages}
            refetchMess={props.refetchMess}
            refetchAcc={props.refetchAcc}
          />
        ) : null}
        {showSettWindow ? (
          <GroupSettings account={props.account} messages={props.messages} />
        ) : null}

        {showWelcomeWindow ? <h1>WELCOME</h1> : null}
      </div>

      <div className="rightPanelLower">
        <MessageSend
          refetchMess={() => fetchMessages(queueId)}
          refetchAcc={props.refetchAcc}
          senderId={props.account?.userId}
        />
      </div>
    </div>
  );
}
