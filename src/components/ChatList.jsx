import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Console from "console";
export default function (props) {
  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.queues?.map((queue, index) => (
        <div key={index} onClick={() => props.setSelectedChat(queue.queueId)}>
          <div className="friendListItem">
            <div>
              <b>{queue.queue.queueName}</b>
            </div>
            {console.log(queue)}
            <div className="friendListLastMes">{queue.queue.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
