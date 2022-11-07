import { useState } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Test from "./components/Test";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [account, setAcc] = useState([]);
  const [selectedChat, setChat] = useState([]);
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
    setChat(param);
  }
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
