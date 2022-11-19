import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Panels from "./components/Panels";
import axios from "axios";

function App() {
  const [account, setAcc] = useState({});
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");
  function login({ username, password }) {
    axios
      .post("https://localhost:7214/api/Users/LoginUser", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setAcc(response.data);
        setLogg(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    // TODO COOKIE
    login({ username: "grolux", password: "grolux" });
  }, []);

  function setAccount(param) {
    setAcc(param);
  }

  function setLogged() {
    setLogg(true);
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
            path="/test/:id"
            element={<Panels account={account} logged={logged} />}
          />
          {/*<Route path="/" element={<LoginRedirect />} />*/}
          <Route path="/" element={<Navigate to={"/test/:id"}></Navigate>} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
