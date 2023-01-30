import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import LoginRedirect from "./components/LoginRedirect";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
  redirect,
} from "react-router-dom";
import Panels from "./components/Panels";
import axios from "axios";
import authHeader from "./services/AuthHeader";

function App() {
  let navigate = useNavigate();
  const [account, setAcc] = useState({});
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");

  useEffect(() => {
    refetch();
  }, []);

  function refetch() {
    let jwt = localStorage.getItem("jwt");
    let username = localStorage.getItem("username");
    const API_URL = "https://localhost:7129/api/Users/ByUsername?username=";
    if (jwt != "" && username != "") {
      axios
        .get(API_URL + username, {
          headers: authHeader(),
        })
        .then((res) => {
          setAccount(res.data);
          if (!logged) {
            setLogged();
          }
        })
        .catch((res) => {
          if (res.response.status == 401) {
            setLogout();
          }
        });
    }
  }

  function setLogged() {
    setLogg(true);
  }

  function setLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setLogg(false);
    navigate("/login");
  }

  function setAccount(param) {
    setAcc(param);
  }

  return (
    <body>
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
              refetch={refetch}
            />
          }
        />
        <Route
          path="/index/:queueId"
          element={
            <Panels
              account={account}
              logged={logged}
              setLogout={setLogout}
              refetchAcc={refetch}
            />
          }
        />

        <Route path="/" element={<LoginRedirect />} />
        <Route path="*" element={<LoginRedirect />} />
      </Routes>
    </body>
  );
}

export default App;
