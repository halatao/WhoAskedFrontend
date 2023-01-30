import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import authHeader from "../services/AuthHeader";

export default function (props) {
  const [avatar, setAvatar] = useState("user");

  const saveAvatar = () => {
    postAvatar(props.account.userName, avatar);
  };

  const postAvatar = (username, avatar) => {
    axios
      .post(
        "https://localhost:7129/api/Users/SetAvatar",
        {
          userName: username,
          avatarName: avatar,
        },
        {
          headers: authHeader(),
        }
      )
      .then(() => {
        props.refetchAcc();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Settings</h3>
      <h5>Change avatar</h5>
      <div className="avatarParent">
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-tie")}
        >
          <FontAwesomeIcon icon={"user-tie"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-secret")}
        >
          <FontAwesomeIcon icon={"user-secret"} size="2xl" />
        </div>
        <div className="avatar" tabIndex="0" onClick={() => setAvatar("robot")}>
          <FontAwesomeIcon icon={"robot"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-ninja")}
        >
          <FontAwesomeIcon icon={"user-ninja"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-injured")}
        >
          <FontAwesomeIcon icon={"user-injured"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-graduate")}
        >
          <FontAwesomeIcon icon={"user-graduate"} size="2xl" />
        </div>
        <div className="avatar" tabIndex="0" onClick={() => setAvatar("poo")}>
          <FontAwesomeIcon icon={"poo"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-astronaut")}
        >
          <FontAwesomeIcon icon={"user-astronaut"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("face-smile")}
        >
          <FontAwesomeIcon icon={"face-smile"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("face-frown")}
        >
          <FontAwesomeIcon icon={"face-frown"} size="2xl" />
        </div>
        <div className="avatar" tabIndex="0" onClick={() => setAvatar("skull")}>
          <FontAwesomeIcon icon={"skull"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("user-nurse")}
        >
          <FontAwesomeIcon icon={"user-nurse"} size="2xl" />
        </div>
        <div
          className="avatar"
          tabIndex="0"
          onClick={() => setAvatar("wheelchair")}
        >
          <FontAwesomeIcon icon={"wheelchair"} size="2xl" />
        </div>
      </div>
      <button onClick={saveAvatar} type="submit">
        save
      </button>
    </div>
  );
}
