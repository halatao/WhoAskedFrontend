import React, { useState, useEffect } from "react";
import axios from "axios";
export default function(props) {
  const [messages, setMessages] = useState([]);

  const fetchData = () => {
    axios
      .get("https://localhost:7214/api/Messages/" + props.queueId + "/10")
      .then((response) => {
        setMessages(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.mess}</div>
      ))}
    </div>
  );
}
