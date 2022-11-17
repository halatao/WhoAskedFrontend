import React, { useState, useEffect } from "react";
import axios from "axios";
export default function (props) {
  return (
    <div>
      {props.messages.map((message, index) => (
        <div key={index}>
          <div>{message.sender}</div>
        <div >{message.mess}</div>

        </div>
      ))}
    </div>
  );
}
