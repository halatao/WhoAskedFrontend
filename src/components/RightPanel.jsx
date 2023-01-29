import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import axios from "axios";
import ChatList from "./ChatList";
import GroupSettings from "./GroupSettings";

export default function (props) {
  const showMessWindow = props.rightPanelMode === "messWin";
  const showSettWindow = props.rightPanelMode === "messSett";
  const showWelcomeWindow = props.rightPanelMode === "messWelcome";

  return (
    <div className="second">
      <div className="rightPanelUpper">
        <label> User: {props.selectedUser?.queueName}</label>
        <button
          onClick={() => {
            props.setRightPanelMode("messSett");
          }}
        >
          Settings
        </button>
      </div>

      <div className="rightPanelMid">
        {showMessWindow ? (
          <MessagesWindow
            account={props.account}
            allUsers={props.selectedChat.users}
            messages={props.messages}
            refetchMess={props.refetchMess}
            refetchAcc={props.refetchAcc}
          />
        ) : null}
        {showSettWindow ? (
          <GroupSettings
            selectedChat={props.selectedChat}
            account={props.account}
            allUsers={props.selectedChat.users}
            messages={props.messages}
          />
        ) : null}

        {showWelcomeWindow ? <h1>WELCOME</h1> : null}
      </div>

      <div className="rightPanelLower">
        <MessageSend
          refetchMess={props.refetchMess}
          refetchAcc={props.refetchAcc}
          queueId={props.selectedChat?.queueId}
          senderId={props.account?.userId}
        />
      </div>
    </div>
  );
}
