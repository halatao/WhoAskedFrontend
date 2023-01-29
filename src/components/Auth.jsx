import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { redirect, useNavigate, Navigate } from "react-router-dom";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import authHeader from "../services/AuthHeader";

export default function (props) {
  const [register, setRegister] = useState(false);
  const initialValues = {
    username: "",
    password: "",
    password2: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [usernameInvalid, setUserInvalid] = useState(true);
  const [passwordInvalid, setPassInvalid] = useState(true);
  const [secondPasswordInvalid, setSecondPassInvalid] = useState(true);
  const [authError, setAuthError] = useState("");
  const API_URL = "https://localhost:7129/api/Users";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateThenLogin = () => {
    if (!register) {
      authUser(values.username, values.password);
    } else if (register && !secondPasswordInvalid) {
      if (values.password === values.password2) {
        authUser(values.username, values.password);
      } else if (values.password == values.password2) {
        setAuthError("Passwords are not matching");
      }
    }
  };

  const authUser = (user, pass) => {
    if (register) {
      axios
        .post("https://localhost:7214/api/Users/RegUser", {
          username: user,
          password: pass,
        })
        .then(function (response) {
          props.setLogged();
          console.log(response.data);
          navigate("/index/");
          UserService.getUserBoard().then((res) => {
            props.setAccount(res);
            console.log(props.account);
          });
        })
        .catch(function (error) {
          setAuthError("User already exist");
          console.log(error);
        });
    } else {
      axios
        .post(API_URL + "/Login", { userName: user, password: pass })
        .then((response) => {
          if (response.data) {
            localStorage.setItem("jwt", JSON.stringify(response.data));
            localStorage.setItem("username", user);
            props.refetch();
            navigate("/index/3");
          }
        })
        .catch(function (error) {
          setAuthError("Unable to login");
          console.log(error);
        });
    }
  };

  function setPasswordInvalid(param) {
    setPassInvalid(param);
  }
  function setSecondPasswordInvalid(param) {
    setSecondPassInvalid(param);
  }
  function setUsernameInvalid(param) {
    setUserInvalid(param);
  }
  function toggleRegister() {
    if (register === true) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  }
  function getLoginForm() {
    return (
      <div>
        <FormInput
          Name="username"
          Type="text"
          Label="Username"
          Placeholder="Enter usename"
          handleInputChange={handleInputChange}
          value={values.username}
          setInvalid={setUsernameInvalid}
          error={props.error}
          notError={props.notError}
        />
        <FormInput
          Name="password"
          Type="password"
          Label="Password"
          Placeholder="Enter password"
          handleInputChange={handleInputChange}
          value={values.password}
          setInvalid={setPasswordInvalid}
          error={props.error}
          notError={props.notError}
        />
      </div>
    );
  }
  function getSecondPassword() {
    return (
      <FormInput
        Name="password2"
        Type="password"
        Label="Confirm password"
        Placeholder="Confirm password"
        handleInputChange={handleInputChange}
        value={values.secondPassword}
        setInvalid={setSecondPasswordInvalid}
        error={props.error}
        notError={props.notError}
      />
    );
  }
  function getButton(param) {
    return (
      <Button variant="primary" onClick={validateThenLogin}>
        {param}
      </Button>
    );
  }

  return (
    <div>
      {register ? (
        <div>
          <Form>
            {getLoginForm()}
            {getSecondPassword()}
            {getButton("Register")}
          </Form>
          <p onClick={toggleRegister}>Already have account?</p>
          <ErrorMessage justDisplay={true} authError={authError} />
        </div>
      ) : (
        <div>
          <Form>
            {getLoginForm()}
            {getButton("Login")}
          </Form>
          <p onClick={toggleRegister}>Dont have account?</p>
          <ErrorMessage justDisplay={true} authError={authError} />
        </div>
      )}
    </div>
  );
}
