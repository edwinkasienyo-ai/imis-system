import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "./Charts.css";

const Charts = ({ stats }) => {

  // BAR DATA (Attendance)
  const attendanceData = [
    { name: "Present", value: stats.present || 0 },
    { name: "Absent", value: stats.absent || 0 },
  ];

  // PIE DATA (Users)
  const userData = [
    { name: "Students", value: stats.totalStudents || 0 },
    { name: "Teachers", value: stats.teachers || 0 },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="charts-container">

      {/* BAR CHART */}
      <div className="chart-box">
        <h3>Attendance Overview</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={attendanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="chart-box">
        <h3>Users Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={userData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {userData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Charts;