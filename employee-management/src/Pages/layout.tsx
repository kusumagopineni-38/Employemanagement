import { Outlet, Link, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "70px",
          background: "linear-gradient(90deg, #1976d2, #4f46e5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontSize: "25px",
          }}
        >
          Employee Management System
        </h2>
      </header>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            width: "240px",
            minWidth: "240px",
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            padding: "30px 18px",
            boxSizing: "border-box",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Link
              to="/dashboard"
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/employees"
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              <span>👨‍💼</span>
              <span>Employees</span>
            </Link>

            <Link
              to="/add-employee"
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              <span>➕</span>
              <span>Add Employee</span>
            </Link>

            <Link
              to="/settings"
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                textDecoration: "none",
                color: "#4b5563",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Link>
          </nav>

          {/* SIGN OUT */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "25px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={handleSignOut}
              style={{
                border: "none",
                background: "transparent",
                color: "#dc2626",
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                gap: "12px",
                padding: "12px",
              }}
            >
              <span>⏻</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: "30px",
            boxSizing: "border-box",
            background: "#f5f7fb",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;