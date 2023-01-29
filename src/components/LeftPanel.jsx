import React from "react";
import { useState } from "react";
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
import { Route, Routes } from "react-router-dom";
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
        <Routes>
          <Route
            index
            element={
              <ChatList
                refetchMess={props.refetchMess}
                refetchAcc={props.refetchAcc}
                account={props.account}
                logged={props.logged}
                messages={props.messages}
              />
            }
          />
          <Route
            path="settings"
            element={
              <Settings
                refetchMess={props.refetchMess}
                refetchAcc={props.refetchAcc}
                account={props.account}
                logged={props.logged}
                messages={props.messages}
              />
            }
          />
          <Route path="*" element={<div />} />
        </Routes>
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

        <button onClick={props.setLogout}>Logout</button>
      </div>
    </div>
  );
}
