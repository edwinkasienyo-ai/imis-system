import { useState } from "react";
import API from "../api/axios";
import "./RightPanel.css";

const roles = [
  "SYSTEM DEVELOPER",
  "HOI/ADMINISTRATOR",
  "TSC",
  "MOE",
  "D/HOI",
  "S/TEACHER",
  "TEACHER",
  "SUPPORT STAFF",
  "BOM",
  "SERVICE PROVIDER",
  "PARENT/GUARDIAN",
  "LEARNER"
];

const RightPanel = () => {
  const [form, setForm] = useState({
    role: "",
    username: "",
    password: "",
    otpChannel: "sms",
    otp: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SEND OTP
  const sendOTP = async () => {
    if (!form.role) return alert("Select Portal Role first");
    if (!form.username) return alert("Enter username first");

    try {
      const res = await API.post("/auth/send-otp", form);
      // In dev mode the backend returns the OTP in the response body so
      // you don't have to configure SMS/Email to log in. Show it to the user.
      if (res?.data?.otp) {
        alert(`OTP sent (dev mode). Code: ${res.data.otp}`);
      } else {
        alert("OTP sent successfully ✅ — check your SMS/email or the server console.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "OTP failed";
      alert(`OTP failed ❌  ${msg}`);
    }
  };

  // ✅ LOGIN
  const login = async () => {
    if (!form.username || !form.password || !form.otp) {
      return alert("Username, password and OTP are all required.");
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      alert(`Login failed ❌  ${msg}`);
    }
  };

  return (
    <div className="right-panel">

      <h2>Welcome Back</h2>
      <p>Sign in to IMIS with your credentials then verify OTP</p>

      <select name="role" onChange={handleChange}>
        <option value="">Choose Portal Role</option>
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <input
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />

      <select name="otpChannel" onChange={handleChange}>
        <option value="sms">SMS</option>
        <option value="email">Email</option>
        <option value="both">SMS & Email</option>
        <option value="console">Developer Console</option>
      </select>

      <button onClick={sendOTP}>Send OTP</button>

      <input
        name="otp"
        placeholder="Enter OTP"
        onChange={handleChange}
      />

      <button onClick={login}>Verify OTP & Login</button>

      <div className="links">
        <span>Forgot Username?</span>
        <span>Forgot Password?</span>
      </div>

    </div>
  );
};

export default RightPanel;