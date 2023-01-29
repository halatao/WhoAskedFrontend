import React from "react";
import ChatPreview from "./ChatPreview";
import { useEffect } from "react";

export default function (props) {
  //useEffect(() => {
  //let interval = setInterval(() => {
  // props.refetchAcc();
  //}, 5000);
  //return () => {
  //clearInterval(interval);
  //};
  //}, []);

  useEffect(() => {
    props.refetchAcc();
  }, []);

  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.queues?.map((queue, index) => (
        <div
          key={index}
          onClick={() => {
            props.setSelectedChat(queue.queueId);
            props.refetchMess();
            props.setRightPanelMode("messWin");
          }}
        >
          <ChatPreview queue={queue}/>
        </div>
      ))}
    </div>
  );
}
