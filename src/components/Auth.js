import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";

export default function(props) {
  const [register, setRegister] = useState(false);
  const initialValues = {
    username: "",
    password: "",
    secondPassword: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [usernameInvalid, setUserInvalid] = useState(true);
  const [passwordInvalid, setPassInvalid] = useState(true);
  const [secondPasswordInvalid, setSecondPassInvalid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validateThenLogin = () => {
    loginUser(values.username, values.password);
  };
  const loginUser = (user, pass) => {
    axios
      .post("https://localhost:7214/api/Users/LoginUser", {
        username: user,
        password: pass,
      })
      .then(function(response) {
        props.setAccount(response.data);
        navigate("/Test");
      })
      .catch(function(error) {
        console.log(error);
      });
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
    if (register) {
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
          values={values}
          text={values.username}
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
          values={values}
          text={values.password}
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
        values={values}
        text={values.secondPassword}
        setInvalid={setPasswordInvalid}
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
          <p1 onClick={toggleRegister}>Dont have account?</p1>
        </div>
      ) : (
        <div>
          <Form>
            {getLoginForm()}
            {getButton("Login")}
          </Form>
          <p1 onClick={toggleRegister}>Already have account?</p1>
        </div>
      )}
    </div>
  );
}
