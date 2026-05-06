import React from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="left">
        <LeftPanel />
      </div>

      <div className="right">
        <RightPanel />
      </div>
    </div>
  );
};

export default Login;