import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginRedirect from "./LoginRedirect";
import MessagesWindow from "./MessagesWindow";
export default function(props) {
  if (props.logged) {
    return (
      <div>
        <Container>
          <Col>
            {props.account.chats.map((chat, index) => (
              <div key={index}>
                <Col onClick={props.setSelectedChat}>
                  <div>User:{chat.users[1].username}</div>
                  <div>Status:{chat.users[1].status}</div>
                  <div>Last message:{chat.lastMessage}</div>
                </Col>
              </div>
            ))}
          </Col>

          <br />

          <Col>
            <MessagesWindow
              setSelectedChat={props.selectedChat}
            ></MessagesWindow>
          </Col>
        </Container>
      </div>
    );
  } else {
    return <LoginRedirect />;
  }
}
