import React from "react";
import LoginRedirect from "./LoginRedirect";
import RightPanel from "./RightPanel";
//import { Col, Container, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function (props) {
  if (!props.logged) {
    return <LoginRedirect />;
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <RightPanel
              refetch={props.refetch}
              account={props.account}
              logged={props.logged}
              selectedChat={props.selectedChat}
              setSelectedChat={props.setSelectedChat}
              messages={props.messages}
            />
          </Col>

          <Col>
            <RightPanel
              refetch={props.refetch}
              account={props.account}
              logged={props.logged}
              selectedChat={props.selectedChat}
              setSelectedChat={props.setSelectedChat}
              messages={props.messages}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
