import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // Open delete popup
  const handleDeleteClick = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDeletePopup(true);
  };

  // Delete employee
  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await axios.delete(
        `http://localhost:5000/employees/${selectedEmployee.id}`
      );

      // Remove employee from UI
      setEmployees((prevEmployees) =>
        prevEmployees.filter(
          (employee) => employee.id !== selectedEmployee.id
        )
      );

      // Close popup
      setShowDeletePopup(false);
      setSelectedEmployee(null);

    } catch (error) {
      console.log("Delete Error:", error);
      alert("Failed to delete employee");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>

              <td>
                <Link to={`/employees/${employee.id}`}>
                  {employee.name}
                </Link>
              </td>

              <td>{employee.department}</td>

              <td>{employee.salary}</td>

              <td>
                <button
                  onClick={() => handleDeleteClick(employee)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE EMPLOYEE POPUP */}

      {showDeletePopup && selectedEmployee && (
        <div className="popup-overlay">
          <div className="popup-box">

            <h3>Delete Employee</h3>

            <p>
              Are you sure you want to delete
              <strong> {selectedEmployee.name}</strong>?
            </p>

            <div style={{ marginTop: "20px" }}>

              <button
                onClick={handleDelete}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes, Delete
              </button>

              <button
                onClick={() => {
                  setShowDeletePopup(false);
                  setSelectedEmployee(null);
                }}
                style={{
                  marginLeft: "10px",
                  padding: "9px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;