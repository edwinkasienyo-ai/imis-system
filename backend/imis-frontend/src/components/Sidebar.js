import "./Sidebar.css";
import { logout } from "../utils/auth";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2>IMIS SYSTEM</h2>

      <p className="subtitle">
        Integrated Management Information System
      </p>

      <div className="menu">
        <h4>CORE</h4>
        <button className="active">Dashboard</button>

        <h4>ADMINISTRATION</h4>
        <button>Admissions</button>
        <button>Students</button>
        <button>Staff</button>
        <button>Attendance</button>
        <button>Exams</button>
        <button>Finance</button>
        <button>Reports</button>
      </div>

      <button className="logout" onClick={logout}>
        Logout
      </button>

    </div>
  );
};

export default Sidebar;