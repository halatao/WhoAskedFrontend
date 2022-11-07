import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Test from "./components/Test";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [account, setAcc] = useState([]);
  const [selectedChat, setChat] = useState([]);
  const [loadedChat, setLoadedChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");
  function setAccount(param) {
    setAcc(param);
  }
  function setLogged() {
    setLogg(true);
  }
  function setSelectedChat(param) {
    if (typeof loadedChat === undefined) {
      setLoadedChat(param);
      setChat(param);
    } else {
      setChat(param);
      fetchMessages();
    }
  }
  function fetchMessages() {
    if (typeof selectedChat !== undefined && typeof loadedChat !== undefined) {
      if (selectedChat.idChat !== loadedChat.idChat) {
        axios
          .get(
            "https://localhost:7214/api/Messages/" + selectedChat.idChat + "/10"
          )
          .then((response) => {
            setMessages(response.data);
            setLoadedChat(selectedChat);
          });
      }
    }
  }
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRedirect />} />
          <Route
            path="/login"
            element={
              <Auth
                setAccount={setAccount}
                setLogged={setLogged}
                setSelectedChat={setSelectedChat}
                error={error}
                notError={notError}
              />
            }
          />
          <Route
            path="/test"
            element={
              <Test
                account={account}
                logged={logged}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                messages={messages}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
