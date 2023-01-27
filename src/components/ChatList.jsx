import React from "react";

export default function (props) {
  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.queues?.map((queue, index) => (
        <div
          key={index}
          onClick={() => {
            props.setSelectedChat(queue.queueId);
            props.setRightPanelMode("messWin");
          }}
        >
          <div className="friendListItem">
            <div>
              <b>{queue.queueName}</b>
            </div>
            <div className="friendListLastMes">{queue.latestMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
