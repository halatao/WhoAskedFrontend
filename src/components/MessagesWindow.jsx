import React from "react";

export default function (props) {
  const allUsers = props.allUsers;
  return (
    <div>
      {props.messages.map((message, index) => {
        const sender = allUsers.find((i) => i.idUser == message.sender);

        return (
          <div key={index}>
            <div>
              <b>{sender?.username ?? ""}</b>
            </div>
            <div>{message.mess}</div>
          </div>
        );
      })}
    </div>
  );
}
