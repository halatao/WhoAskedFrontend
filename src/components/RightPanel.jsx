import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginRedirect from "./LoginRedirect";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
export default function (props) {
  return (
    <div>
      <div className="rightPanelUpper">User:</div>
      <div className="rightPanelMid">
        <Row>
          <Col>
            <MessagesWindow messages={props.messages}></MessagesWindow>
          </Col>

          <div className="rightPanelLower">
            <Col>
              <MessageSend
                refetch={props.refetch}
                queueId={props.selectedChat.idChat}
                senderId={props.account.idUser}
              />
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
}
