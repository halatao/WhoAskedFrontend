import React from "react";
import { Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
export default function(props) {
  return (
    <div>
      <Form.Group controlId={props.Name}>
        <Form.Label>{props.Label}</Form.Label>
        <Form.Control
          name={props.Name}
          type={props.Type}
          placeholder={props.Placeholder}
          onChange={props.handleInputChange}
          value={props.value}
        />
        <Form.Text className="text-muted">
          <ErrorMessage
            text={props.value}
            setInvalid={props.setInvalid}
            error={props.error}
            notError={props.notError}
          />
        </Form.Text>
      </Form.Group>
    </div>
  );
}
