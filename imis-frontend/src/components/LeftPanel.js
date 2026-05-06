import React from "react";
import "./LeftPanel.css";
<img src="/school.jpg" alt="Students" className="left-image" />

const LeftPanel = () => {
  return (
    <div className="left-panel">

      {/* IMAGE */}
      <div className="image-section">
        <img src={schoolImage} alt="IMIS" />
      </div>

      {/* TITLE */}
      <h2 className="title">
        INTEGRATED MANAGEMENT INFORMATION SYSTEM<br />
        FOR BASIC LEARNING INSTITUTIONS
      </h2>

      {/* DESCRIPTION */}
      <div className="description">
        <p><b>IMIS</b> is a smart, secure, digital platform for modern education management.</p>

        <p>
          The Integrated Management Information System (IMIS) enhances efficiency,
          accountability, governance, and ensures real-time access to critical data.
        </p>

        <p>
          Developed in compliance with Basic Education Regulations, 2015
          (Legal Notice No. 39 of 2015), clauses 61–63.
        </p>
      </div>

      {/* CONTACT */}
      <div className="contact">
        📞 0725757767<br />
        ✉ mwendeguenterpriseltd@gmail.com
      </div>

      {/* FOOTER */}
      <div className="footer">
        © MWENDEGU ENTERPRISE LIMITED — ALL RIGHTS RESERVED
      </div>

    </div>
  );
};

export default LeftPanel;