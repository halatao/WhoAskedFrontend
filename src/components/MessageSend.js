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
    if (messageInvalid === false) {
      sendMessage(props.senderId, props.queueId, message);
    }
  }
  const sendMessage = (senderId, queueId, message) => {
    axios
      .post("https://localhost:7214/api/Messages", {
        sender: senderId,
        queueId: queueId,
        mess: message,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <FormInput
        Name="message"
        Type="text"
        Placeholder="Enter a message"
        setInvalid={setMessageInvalid}
        value={message}
        handleInputChange={handleInputChange}
      />
      <Button onClick={validateThenSend}>Send</Button>
    </div>
  );
}
