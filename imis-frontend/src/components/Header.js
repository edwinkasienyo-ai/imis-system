import React from "react";
import "./Header.css";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">

      <h2>Dashboard</h2>

      <div className="header-right">
        <input placeholder="Search..." />

        <span className="user">
          {user?.fullName || "User"}
        </span>
      </div>

    </div>
  );
}