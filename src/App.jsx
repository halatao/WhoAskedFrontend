import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Panels from "./components/Panels";
import axios from "axios";
import UserService from "./services/UserService";
import authHeader from "./services/AuthHeader";

function App() {
  const [account, setAcc] = useState({});
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    let username = localStorage.getItem("username");
    const API_URL = "https://localhost:7129/api/Users/ByUsername?username=";
    if (jwt && username) {
      axios
        .get(API_URL + localStorage.getItem("username"), {
          headers: authHeader(),
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, []);

  function setLogged() {
    setLogg(false);
  }

  function setAccount(param) {
    setAcc(param);
  }
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
            path="/index"
            element={<Panels account={account} logged={logged} />}
          />

          <Route path="/" element={<LoginRedirect />} />
          {/* <Route path="/" element={<Navigate to={"/test/:id"}></Navigate>} /> */}
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
