import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Pages/layout";
import EmployeeList from "./Pages/EmployeeList";
import AddEmployee from "./Pages/AddEmployee";
import EmployeeDetails from "./Pages/EmployeeDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          element={
            localStorage.getItem("isLoggedIn") ? (
              <MainLayout />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route
            path="/employees/:id"
            element={<EmployeeDetails />}
          />
          <Route
            path="/add-employee"
            element={<AddEmployee />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;