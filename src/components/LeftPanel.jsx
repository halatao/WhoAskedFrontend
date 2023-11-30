import React from "react";
import { useState, useEffect } from "react";
import ChatList from "./ChatList";
import Settings from "./Settings";
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

  /*useEffect(() => {
    let interval = setInterval(() => {
      props.refetchAcc();
    }, 3500);
    return () => {
      clearInterval(interval);
    };
  }, []);*/

  return (
    <div className="first">
      <div className="leftPanelUpper">
        <div className="leftPanelMessButt">
          <button
            onClick={() => {
              setMode("mess");
            }}
          >
            Messages
          </button>
        </div>
        <div className="leftPanelSettButt">
          <button
            onClick={() => {
              setMode("Settings");
            }}
          >
            Settings
          </button>
        </div>
      </div>
      <div className="leftPanelMid">
        {showMessages ? (
          <ChatList
            setRightPanelMode={props.setRightPanelMode}
            refetchMess={props.refetchMess}
            refetchAcc={props.refetchAcc}
            account={props.account}
            logged={props.logged}
            selectedChat={props.selectedChat}
            setSelectedChat={props.setSelectedChat}
            messages={props.messages}
          />
        ) : null}

        {showSettings ? (
          <Settings
            refetchMess={props.refetchMess}
            refetchAcc={props.refetchAcc}
            account={props.account}
            logged={props.logged}
            selectedChat={props.selectedChat}
            setSelectedChat={props.setSelectedChat}
            messages={props.messages}
          />
        ) : null}
      </div>

      <div className="leftPanelLower">
        <div className="leftPanelLowerInside">
          <div className="leftLowerAvatar">
            <FontAwesomeIcon icon={props.account?.avatar} size="xl" />
          </div>
          <div className="leftLowerUsername">
            <label>{props.account.userName}</label>
          </div>
          <div className="leftLowerButton">
            <button onClick={props.setLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
