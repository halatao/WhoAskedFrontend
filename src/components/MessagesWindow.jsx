import { useState } from "react";
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
export default function (props) {
  const loggedAcc = props.account.userName;

  const params = useParams();
  const queueId = params.queueId ?? 3;

  const queues = props.account?.queues ?? [];
  const allUsers = queues?.find((i) => i.queueId.toString() === queueId) ?? [];
  const users = allUsers.users;
  const messages = props.messages;

  function formatDate(param) {
    var date = new Date(param);
    console.log(format(date, "H:mma"));
  }

  return (
    <div>
      {messages.map((message, index) => {
        const sender = users.find((i) => i.userId == message.sender);
        let symbol = message.mess.includes("@" + loggedAcc);
        if (symbol) {
          return (
            <div key={index}>
              <div>
                <b>
                  <div>{sender?.userName ?? ""}</div>
                  <div>{message?.sent ?? ""}</div>
                </b>
              </div>
              <div className="mention">{message.mess}</div>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <div>
                <b>
                  <div>{sender?.userName ?? ""}</div>
                  <div>{message?.sent ?? ""}</div>
                </b>
              </div>

              <div>{message.mess}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
