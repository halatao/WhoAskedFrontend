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




  function Bubble(message, index){
    const sender = props.users.find((i) => i.userId == message.sender);
    const symbol = message.mess.includes("@" + loggedAcc);

    if(loggedAcc === sender?.userName){
      return (
          <div key={index} className="messParentReply">

            <div className="wrapper2">
<div className="wrapper3">
              <div className="messTimeReply">
                {formatDate(message?.sent ?? "")}
              </div>
              {" "}
              <div className="messName">
                <b>{sender?.userName ?? ""}</b>
              </div>
</div>
              <div className="messMessageReply">
                <div style={{color: symbol ? "#5a94fd" : "white",backgroundColor:"purple", width: "fit-content", padding:"7pt", borderRadius:"25px"}}>{message.mess}</div>
                <FontAwesomeIcon
                    icon={["fas", sender?.avatar ?? "user"]}
                    size="xl"
                />{" "}
              </div>
            </div>
          </div>
      );
    }
    else{
      return(
      <div key={index} className="messParent">
        <div className="wrapper2">
          <div className="messName">
            <b>{sender?.userName ?? ""}</b>
          </div>
          <div className="messTime">
            {formatDate(message?.sent ?? "")}
          </div>
          <div className="messMessage">
            <FontAwesomeIcon
                icon={["fas", sender?.avatar ?? "user"]}
                size="xl"
            />
            <div style={{color: symbol ? "blue" : "black",backgroundColor:"#e0e0e0", width: "fit-content", padding:"7pt", borderRadius:"25px",marginLeft:"3px"}}>{message.mess}</div>
          </div>
        </div>
      </div>
      );
    }
  }


  return (
    <div>
      {messages.map((message, index) => {

          return Bubble(message, index);
      })}
    </div>
  );
}
