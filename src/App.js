import { useState } from "react";
import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Test from "./components/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [account, setAcc] = useState([]);
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");
  function setAccount(param) {
    setAcc(param);
  }
  function setLogged(){
  setLogg(true);
  }
  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth setAccount={setAccount} setLogged={setLogged} error={error} notError={notError} />} />
          <Route path="/test" element={<Test account={account} logged={logged} />} />
        </Routes>
      </BrowserRouter>
    </body>
  );
}

export default App;
