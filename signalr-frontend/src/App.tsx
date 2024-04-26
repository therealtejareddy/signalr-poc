import React, { useEffect, useState } from 'react';
import './App.css';
import Connector from './signalrConnection'
function App() {
  const { newMessage, events } = Connector();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [msgList, setMsgList] = useState<Array<string>>([])
  const [joinedUser, setJoinedUser] = useState<Array<string>>([])
  useEffect(() => {
    const handleMessageReceived = (message:string) => {
      setJoinedUser([...joinedUser,message])
      console.log(message)
    };
    const handleUserMessageReceived = (message:string) => { 
      console.log(message)
      setMsgList([...msgList,message])
    }
    const handleUserLeft = (message:string) => {
      setJoinedUser([...joinedUser,message])
    }
    events(handleMessageReceived ,handleUserMessageReceived, handleUserLeft );
  });
  return (
    <div className="">
      <br />
      <span>Username</span>
      <input type='text' value={username} onChange={e => setUsername(e.target.value)}/><br/>
      <span>Message</span>
      <input type="text" value={message} onChange={e => {
          setMessage(e.target.value)
      }}/>
      <button onClick={() => {
        console.log(msgList)
        if(username && message){
          newMessage(username,message)
        }
        setMessage("")
      }}>send</button>
      <ul>
        {
          joinedUser.map((msg,idx) => <li key={idx} style={msg.endsWith("Joined") ? {color:"green"} : {color:"red"}}>{msg}</li>)
        }
      </ul>
      <ul>
        {
          msgList.map((msg,idx) => <li key={idx}>{msg}</li>)
        }
      </ul>
    </div>
  );
}
export default App;