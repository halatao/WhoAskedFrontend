import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { Button, Form } from "react-bootstrap";

export default function (props) {
  const [selectedUser, setSelectedUser] = useState();

  const initialValues = {
    username: "",
  };

  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const deleteUser = () => {
    postDelete(selectedUser, props.selectedChat.queueId);
  };

  const addUser = () => {
    postAdd(values.username, props.selectedChat.queueId);
  };

  const postDelete = (userId, queueId) => {
    axios
      .post("https://localhost:7129/api/Users/RemoveFromQueue", {
        userId: userId,
        queueId: queueId,
      })
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postAdd = (userName, queueId) => {
    axios
      .post("https://localhost:7129/api/Users/AddToQueue", {
        userName: userName,
        queueId: queueId,
      })
      .then(() => {
        console.log("Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Settings</h3>
      <h4>Add user</h4>
      <Form>
        <FormInput
          Name="username"
          Type="text"
          Label="Username"
          Placeholder="Enter username"
          handleInputChange={handleInputChange}
          value={values.username}
        />
        <Button variant="primary" onClick={addUser}>
          Add
        </Button>
      </Form>
      <h4>Delete user</h4>
      <div>
        {props.selectedChat?.users?.map((users, index) => (
          <div key={index} onClick={() => setSelectedUser(users.userId)}>
            {users.userName}
          </div>
        ))}
      </div>
      <button onClick={deleteUser} type="submit">
        delete
      </button>
    </div>
  );
}
