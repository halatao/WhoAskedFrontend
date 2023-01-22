import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function (props) {
  return (
    <div>
      <h3>FriendList</h3>
      {props.account?.chats?.map((chat, index) => (
        <div key={index} onClick={() => props.setSelectedChat(chat.idChat)}>
          <div className="friendListItem">
            <div>
              <b>{chat.users[0].username}</b>
            </div>
            <div className="friendListLastMes">{chat.lastMessage}</div>
            <div>{chat.users[0].status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
