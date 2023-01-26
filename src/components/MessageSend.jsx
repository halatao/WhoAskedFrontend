import React from "react";
import FormInput from "./FormInput";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function (props) {
  const [message, setMessage] = useState("");
  const [messageInvalid, setMessInvalid] = useState(true);
  function setMessageInvalid(param) {
    setMessInvalid(param);
  }
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  function validateThenSend() {
    sendMessage(props.senderId, props.queueId, message);
  }
  const sendMessage = (senderId, queueId, message) => {
    axios
      .post("https://localhost:7129/api/Messages", {
        sender: senderId,
        queueId: queueId,
        mess: message,
        sent: "2023-01-26T15:53:20.083",
      })
      .then(function (response) {
        console.log(response.data);
        props.refetch();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="messLower">
      <FormInput
        Name="message"
        Type="text"
        Placeholder="Enter a message"
        setInvalid={setMessageInvalid}
        value={message}
        handleInputChange={handleInputChange}
      />

      <div className="messageButton">
        <Button onClick={validateThenSend}>Send</Button>
      </div>
    </div>
  );
}
