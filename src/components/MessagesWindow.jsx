import { useState } from "react";
import { React, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function (props) {
  const loggedAcc = props.account.userName;

  const queueId = useParams() ?? 3;

  const queues = props.account?.queues ?? [];
  const allUsers = queues?.find((i) => i.queueId === queueId);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let interval = setInterval(() => {
      function fetchMessages() {
        axios
          .get(
            "https://localhost:7129/api/Messages/" +
              queueId +
              "/10?userId=" +
              props.account.userId
          )
          .then((response) => {
            console.log(response.data[0].queueId);
            setMessages(response.data);
          });
      }
      fetchMessages();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [queueId]);

  return (
    <div>
      {messages.map((message, index) => {
        const sender = allUsers.find((i) => i.userId == message.sender);
        let symbol = message.mess.includes("@" + loggedAcc);
        if (symbol) {
          return (
            <div key={index}>
              <div>
                <b>{sender?.userName ?? ""}</b>
              </div>
              <div className="mention">{message.mess}</div>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <div>
                <b>{sender?.userName ?? ""}</b>
              </div>

              <div>{message.mess}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
