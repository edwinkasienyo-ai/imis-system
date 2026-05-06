import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/dashboard/stats");
    setStats(res.data);
  };

  return (
    <div className="dashboard">

      <h2>
        WELCOME {user?.username} - {user?.role}
      </h2>

      <div className="cards">
        <div>Total Students: {stats.totalStudents}</div>
        <div>Teachers: {stats.teachers}</div>
        <div>Present: {stats.present}</div>
        <div>Absent: {stats.absent}</div>
      </div>

      <div className="announcements">
        No Active Announcements
      </div>

    </div>
  );
};

export default Dashboard;