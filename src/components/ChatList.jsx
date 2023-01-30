import React from "react";
import ChatPreview from "./ChatPreview";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function (props) {
  useEffect(() => {
    props.refetchAcc();
  }, []);

  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.queues?.map((queue, index) => (
        <Link
          to={"/index/" + queue.queueId}
          key={index}
          onClick={() => props.setRightPanelMode("messWin")}
        >
          <ChatPreview queue={queue} />
        </Link>
      ))}
    </div>
  );
}
