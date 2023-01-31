import { useState } from "react";
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
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

  function formatDate(param) {
    let date = new Date(param);
    let offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return format(date, "H:mma");
  }

  return (
    <div>
      {messages.map((message, index) => {
        const sender = props.users.find((i) => i.userId == message.sender);
        let symbol = message.mess.includes("@" + loggedAcc);
        if (symbol) {
          return (
            <div key={index} className="messParent">
              <div className="wrapper1">
                <FontAwesomeIcon
                  icon={["fas", sender?.avatar ?? "user"]}
                  size="xl"
                />{" "}
              </div>
              <div className="wrapper2">
                <div className="messName">
                  <b>{sender?.userName ?? ""}</b>
                </div>
                <div className="messTime">
                  {formatDate(message?.sent ?? "")}
                </div>
                <div className="mention">{message.mess}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="messParent">
              <div className="wrapper1">
                <FontAwesomeIcon
                  icon={["fas", sender?.avatar ?? "user"]}
                  size="xl"
                />{" "}
              </div>
              <div className="wrapper2">
                <div className="messName">
                  <b>{sender?.userName ?? ""}</b>
                </div>
                <div className="messTime">
                  {formatDate(message?.sent ?? "")}
                </div>
                <div className="messMessage">{message.mess}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
