import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import authHeader from "../services/AuthHeader";

export default function (props) {
  const [selectedUser, setSelectedUser] = useState();
  const { queueId } = useParams();

  const queues = props.account?.queues ?? [];
  const allUsers = queues?.find((i) => i.queueId.toString() === queueId) ?? [];
  const users = allUsers.users;

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
    if (selectedUser.userName === allUsers.ownerUsername) {
      console.log("owner se nemůže smazat");
    } else {
      postDelete(selectedUser.userId, queueId);
    }
  };

  const addUser = () => {
    postAdd(values.username, queueId);
  };

  const postDelete = (userId, queueId) => {
    axios
      .post(
        "https://localhost:7129/api/Users/RemoveFromQueue",
        {
          userId: userId,
          queueId: queueId,
        },
        {
          headers: authHeader(),
        }
      )
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postAdd = (userName, queueId) => {
    axios
      .post(
        "https://localhost:7129/api/Users/AddToQueue",
        {
          userName: userName,
          queueId: queueId,
        },
        {
          headers: authHeader(),
        }
      )
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
        {users.map((users, index) => (
          <div key={index} onClick={() => setSelectedUser(users)}>
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
