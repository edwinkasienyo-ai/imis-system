import "./Topbar.css";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="topbar">

      <input placeholder="Search dashboard..." />

      <div className="profile">
        {user?.fullName} ({user?.role})
      </div>

    </div>
  );
};

export default Topbar;