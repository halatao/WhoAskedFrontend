import React from "react";

export default function (props) {
  const allUsers = props.allUsers;
  const loggedAcc = props.account.userName;

  console.log(loggedAcc);
  return (
    <div>
      {props.messages.map((message, index) => {
        const sender = allUsers.find((i) => i.userId == message.sender);
        let symbol = message.mess.includes("@" + loggedAcc);
        let zavinac = message.mess.includes("@");
        console.log(symbol);
        if (!zavinac || (zavinac && symbol) || sender?.userName === loggedAcc) {
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
