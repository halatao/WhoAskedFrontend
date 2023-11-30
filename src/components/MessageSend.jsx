import React from "react";
import FormInput from "./FormInput";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import authHeader from "../services/AuthHeader";

export default function (props) {
  const [message, setMessage] = useState("");
  const [messageInvalid, setMessInvalid] = useState(true);

  const { queueId } = useParams();

  function setMessageInvalid(param) {
    setMessInvalid(param);
  }
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  function validateThenSend() {
    sendMessage(props.senderId, queueId, message);
    setMessage("");
  }
  const sendMessage = (senderId, queueId, message) => {
    axios
      .post(
        "https://localhost:7129/api/Messages",
        {
          sender: senderId,
          queueId: queueId,
          mess: message,
          sent: new Date().toISOString(),
        },
        {
          headers: authHeader(),
        }
      )
      .then(function (response) {
        props.refetchMess();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form
      className="messLower"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        validateThenSend();
      }}
    >
      <FormInput
        Name="message"
        Type="text"
        Placeholder="Enter a message"
        setInvalid={setMessageInvalid}
        value={message}
        handleInputChange={handleInputChange}
        autoComplete="new-password"
      />

      <div className="messageButton">
        <Button className="buttonButton" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
}
