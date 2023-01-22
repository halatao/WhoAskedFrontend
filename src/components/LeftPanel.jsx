import React from "react";
import { useState } from "react";
import ChatList from "./ChatList";
import FriendList from "./FriendList";

export default function (props) {
  const [mode, setMode] = useState("mess");

  function canShowMessages() {
    return mode === "mess";
  }

  const showMessages = canShowMessages();
  const showFriends = mode === "friend";

  return (
    <div className="first">
      <div className="leftPanelUpper">
        <button
          onClick={() => {
            setMode("friend");
          }}
        >
          friend
        </button>

        <button
          onClick={() => {
            setMode("mess");
          }}
        >
          messages
        </button>
      </div>
      <div className="leftPanelMid">
        {showMessages ? (
          <ChatList
            refetch={props.refetch}
            account={props.account}
            logged={props.logged}
            selectedChat={props.selectedChat}
            setSelectedChat={props.setSelectedChat}
            messages={props.messages}
          />
        ) : null}
        {showFriends ? (
          <FriendList
            refetch={props.refetch}
            account={props.account}
            logged={props.logged}
            selectedChat={props.selectedChat}
            setSelectedChat={props.setSelectedChat}
            messages={props.messages}
          />
        ) : null}
      </div>

      <div className="leftPanelLower">
        <label>{props.account.username}</label>
        <br></br>
        <label>{props.account.status}</label>
      </div>
    </div>
  );
}
