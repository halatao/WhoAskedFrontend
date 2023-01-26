import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import LoginRedirect from "./components/LoginRedirect";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Panels from "./components/Panels";
import axios from "axios";
import authHeader from "./services/AuthHeader";

function App() {
  const [account, setAcc] = useState({});
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");

  useEffect(() => {
    console.log("app");
    let jwt = localStorage.getItem("jwt");
    let username = localStorage.getItem("username");
    console.log(username + jwt);
    const API_URL = "https://localhost:7129/api/Users/ByUsername?username=";
    if (jwt != "" && username != "") {
      axios
        .get(API_URL + username, {
          headers: authHeader(),
        })
        .then((res) => {
          console.log("passed");
          console.log(res.data);
          setAcc(res.data);
          console.log(account);
          setAccount(res.data);
          console.log(account);
          setLogged();
          redirect("/index/");
        })
        .catch((res) => {
          if (res.status == 401) {
            setLogout();
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            redirect("/login/");
          }
        });
    }
  }, []);

  function setLogged() {
    setLogg(true);
  }

  function setLogout() {
    setLogg(false);
  }

  function setAccount(param) {
    console.log(param);
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
                setAccount={setAcc}
                setLogged={setLogg}
                error={error}
                notError={notError}
                logged={logged}
              />
            }
          />
          <Route
            path="/index"
            element={<Panels account={account} logged={logged} />}
          />

          <Route path="/" element={<LoginRedirect />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
