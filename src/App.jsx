import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Test from "./components/Test";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import Panels from "./components/Panels";
import { useParams } from "react-router-dom";

function App() {
  const [account, setAcc] = useState([]);
  const [loadedChat, setLoadedChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");

  const [selectedChat, setSelectedChat] = useState({});
  const params = useParams();

  useEffect(() => {
    const chat =
      account?.chats?.find((i) => i.id == params.id) ?? account.chats?.[0];
    setSelectedChat(chat);
  }, [params.id]);

  function setAccount(param) {
    setAcc(param);
  }

  function setLogged() {
    setLogg(true);
  }

  /*function setSelectedChat(param) {
    if (typeof loadedChat === undefined) {
      setLoadedChat(param);
      setChat(param);
    } else {
      setChat(param);
      fetchMessages();
    }
  }*/

  function fetchMessages() {
    if (!selectedChat) {
      return;
    }
    axios
      .get("https://localhost:7214/api/Messages/" + selectedChat.idChat + "/10")
      .then((response) => {
        setMessages(response.data);
        setLoadedChat(selectedChat);
      });
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth
                setAccount={setAccount}
                setLogged={setLogged}
                error={error}
                notError={notError}
              />
            }
          />
          <Route
            path="/test/:id"
            element={
              <Panels
                refetch={() => {
                  fetchMessages();
                }}
                account={account}
                logged={logged}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                messages={messages}
              />
            }
          />
          <Route path="/" element={<LoginRedirect />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
