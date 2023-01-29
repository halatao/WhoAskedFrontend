import React, { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

export default function (props) {
  return (
    <div className="panels">
      <div className="wrapper">
        <LeftPanel
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
          setLogout={props.setLogout}
        />

        <RightPanel
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
        />
      </div>
    </div>
  );
}
