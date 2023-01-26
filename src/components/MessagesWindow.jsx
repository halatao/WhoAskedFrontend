import React from "react";

export default function (props) {
  const allUsers = props.allUsers;
  return (
    <div>
      {props.messages.map((message, index) => {
        const sender = allUsers.find((i) => i.userId == message.sender);

        return (
          <div key={index}>
            <div>
              <b>{sender?.userName ?? ""}</b>
            </div>
            <div>{message.mess}</div>
          </div>
        );
      })}
    </div>
  );
}
