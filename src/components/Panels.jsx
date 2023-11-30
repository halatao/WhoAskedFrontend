import React, { useEffect, useState } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoginRedirect from "./LoginRedirect";
export default function (props) {
  const [rightPanelMode, setRightPanelMode] = useState("messWin");
  return (
    <div className="panels">
      <div className="wrapper">
        <LeftPanel
          rightPanelMode={rightPanelMode}
          setRightPanelMode={setRightPanelMode}
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
          setLogout={props.setLogout}
        />

        <RightPanel
          rightPanelMode={rightPanelMode}
          setRightPanelMode={setRightPanelMode}
          refetchAcc={props.refetchAcc}
          account={props.account}
          logged={props.logged}
        />
      </div>
    </div>
  );
}
