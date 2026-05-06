import { useEffect, useState } from "react";
import API from "../api/axios";
import { logout } from "../utils/auth";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [statsError, setStatsError] = useState(null);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    user = null;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await API.get("/dashboard/stats");
        if (!cancelled) setStats(res.data || {});
      } catch (err) {
        if (cancelled) return;
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Could not load dashboard stats.";
        setStatsError(msg);
        setStats({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="dashboard">

      <h2>
        WELCOME {user?.username || user?.fullName || "user"}
        {user?.role ? ` - ${user.role}` : ""}
      </h2>

      {statsError && (
        <div className="dashboard-warning" role="alert">
          ⚠ {statsError} (dashboard data not available yet)
        </div>
      )}

      <div className="cards">
        <div>Total Students: {stats.totalStudents ?? "—"}</div>
        <div>Teachers: {stats.teachers ?? "—"}</div>
        <div>Present: {stats.present ?? "—"}</div>
        <div>Absent: {stats.absent ?? "—"}</div>
      </div>

      <div className="announcements">
        No Active Announcements
      </div>

      <button
        type="button"
        onClick={logout}
        style={{ marginTop: "1rem" }}
      >
        Logout
      </button>

    </div>
  );
};

export default Dashboard;