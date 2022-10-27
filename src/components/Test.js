import React from "react";
import LoginRedirect from "./LoginRedirect";
export default function(props) {
  if (props.logged) {
    return (
      <div>
        <pre>{JSON.stringify(props.account)}</pre>
      </div>
    );
  } else {
    return <LoginRedirect />;
  }
}
