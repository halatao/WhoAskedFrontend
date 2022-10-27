import { useState, React } from "react";
export default function(props) {
  return (
    <div>
      <pre>{JSON.stringify(props.account)}</pre>
    </div>
  );
}
