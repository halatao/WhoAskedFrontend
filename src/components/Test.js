import React from "react";
import { redirect } from "react-router-dom";
export default function(props) {
  if (props.logged) {
    return (
      <div>
        <pre>{JSON.stringify(props.account)}</pre>
      </div>
    );
  } else {
    return redirect("/");
  }
}
