import React from "react";
import MessageSend from "./MessageSend";
import MessagesWindow from "./MessagesWindow";
import GroupSettings from "./GroupSettings";
import { Link } from "react-router-dom";

export default function (props) {
  const showMessWindow = props.rightPanelMode === "messWin";
  const showSettWindow = props.rightPanelMode === "messSett";
  const showWelcomeWindow = props.rightPanelMode === "messWelcome";

  return (
    <div className="second">
      <div className="rightPanelUpper">
        <label> User: {props.selectedUser?.queueName}</label>
        <Link to={"/index/settings"}>Settings</Link>
      </div>

      <div className="rightPanelMid">
        {showMessWindow ? (
          <MessagesWindow
            account={props.account}
            messages={props.messages}
            refetchMess={props.refetchMess}
            refetchAcc={props.refetchAcc}
          />
        ) : null}
        {showSettWindow ? (
          <GroupSettings account={props.account} messages={props.messages} />
        ) : null}

        {showWelcomeWindow ? <h1>WELCOME</h1> : null}
      </div>

      <div className="rightPanelLower">
        <MessageSend
          refetchMess={props.refetchMess}
          refetchAcc={props.refetchAcc}
          senderId={props.account?.userId}
        />
      </div>
    </div>
  );
}
