export default function (props) {
  return (
    <div>
      <h3>Chatlist</h3>
      {props.account?.queues?.map((queue, index) => (
        <div key={index} onClick={() => props.setSelectedChat(queue.queueId)}>
          <div className="friendListItem">
            <div>
              <b>{queue.queueName}</b>
            </div>
            {console.log(queue)}
            <div className="friendListLastMes">{queue.latestMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
