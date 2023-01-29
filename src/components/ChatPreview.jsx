import React from "react";
import { useEffect } from "react";
export default function (props) {
  if (!props.queue.seen) {
    return (
      <div className="friendListItem notSeen">
        <div>
          <b>{props.queue.queueName}</b>
        </div>
        <div className="friendListLastMes notSeenFont">
          {props.queue.latestMessage}
        </div>
      </div>
    );
  } else {
    return (
      <div className="friendListItem">
        <div>
          <b>{props.queue.queueName}</b>
        </div>
        <div className="friendListLastMes">{props.queue.latestMessage}</div>
      </div>
    );
  }
}
