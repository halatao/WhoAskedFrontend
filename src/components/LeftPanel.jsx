import React from "react";
import { useState } from "react";
import ChatList from "./ChatList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLaptop,
  faUserSecret,
  faWheelchair,
  faRobot,
  faUserTie,
  faUserAstronaut,
  faUserNurse,
  faUserNinja,
  faUserInjured,
  faUserGraduate,
  faPoo,
  faFaceSmile,
  faSkull,
  faFaceFrown,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import Settings from "./Settings";
library.add(
  faUser,
  faShieldHalved,
  faLaptop,
  faUserSecret,
  faWheelchair,
  faRobot,
  faUserTie,
  faUserAstronaut,
  faUserNurse,
  faUserNinja,
  faUserInjured,
  faUserGraduate,
  faPoo,
  faFaceSmile,
  faSkull,
  faFaceFrown
);

export default function (props) {
  const [mode, setMode] = useState("mess");

  function canShowMessages() {
    return mode === "mess";
  }

  const showMessages = canShowMessages();
  const showSettings = mode === "Settings";

  return (
    <div className="first">
      <div className="leftPanelUpper">
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

        {showSettings ? (
          <Settings
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
        <FontAwesomeIcon icon={props.account?.avatar} size="xl" />
        <label>{props.account.userName}</label>
        <button
          onClick={() => {
            setMode("Settings");
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
