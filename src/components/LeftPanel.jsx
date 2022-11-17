import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginRedirect from "./LoginRedirect";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
export default function (props) {
  return (
    <div>
      <div className="leftPanelUpper">vrchni cast</div>
      <div className="leftPanelMid">
        <Container>
          <Row>
            <Col>
              {props.account.chats.map((chat, index) => (
                <div key={index} onClick={props.setSelectedChat(chat)}>
                  <div className="friendListItem">
                    <div>{chat.users[1].username}</div>
                    <div className="friendListLastMes">{chat.lastMessage}</div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="leftPanelLower">
        <label>{props.account.username}</label>
        <br></br>
        <label>{props.account.status}</label>
      </div>
    </div>
  );
}
