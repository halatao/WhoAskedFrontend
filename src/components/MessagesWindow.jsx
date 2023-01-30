import { useState } from "react";
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
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
  faFaceFrown
);
export default function (props) {
  const loggedAcc = props.account.userName;

  const messages = props.messages;
  return (
    <div>
      {messages.map((message, index) => {
        const sender = props.users.find((i) => i.userId == message.sender);
        let symbol = message.mess.includes("@" + loggedAcc);
        if (symbol) {
          return (
            <div key={index}>
              <div>
                <FontAwesomeIcon icon={sender?.avatar} size="sm" />{" "}
                <b>{sender?.userName ?? ""}</b>
              </div>
              <div className="mention">{message.mess}</div>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <div>
                <FontAwesomeIcon icon={sender?.avatar} size="sm" />{" "}
                <b>{sender?.userName ?? ""}</b>
              </div>

              <div>{message.mess}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
