import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Console from "console";
export default function (props) {
  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.chats?.map((chat, index) => (
        <div key={index} onClick={() => props.setSelectedChat(chat.idChat)}>
          <div className="friendListItem">
            <div>
              <b>{chat.users[0].username}</b>
            </div>
            {console.log(chat)}
            <div className="friendListLastMes">{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
