import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const initialValues = {
    username: "",
    password: "",
  };
const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);

  const [usernameInvalid, setUsernameInvalid] = useState(true);
  const [passwordInvalid, setPasswordInvalid] = useState(true);

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
      .then(function (response) {
        props.setAccount(response.data);
        navigate("/Test")
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleInputChange}
            value={values.username}
          />
          <Form.Text className="text-muted">
            <ErrorMessage
              text={values.username}
              setInvalid={setUsernameInvalid}
              error={props.error}
              notError={props.notError}
            />
          </Form.Text>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
            value={values.password}
          />
          <Form.Text className="text-muted">
            <ErrorMessage
              text={values.password}
              setInvalid={setPasswordInvalid}
              error={props.error}
              notError={props.notError}
            />
          </Form.Text>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={validateThenLogin}>
        Login
      </Button>
    </div>
  );
}
