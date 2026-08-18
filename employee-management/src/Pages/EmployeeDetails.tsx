import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<any>(null);
  const [address, setAddress] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [showManagerForm, setShowManagerForm] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showAddressEditForm, setShowAddressEditForm] = useState(false);
  const [showAddressDeleteConfirm, setShowAddressDeleteConfirm] =
    useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [message, setMessage] = useState("");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "",
    salary: "",
    email: "",
  });

  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const loadEmployee = () => {
    axios
      .get(`http://54.204.231.101:5000/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);

        setEmployeeData({
          name: response.data.name,
          department: response.data.department,
          salary: response.data.salary,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.log("Employee error:", error);
      });
  };

  const loadAddress = () => {
    axios
      .get(`http://54.204.231.101:5000/employees/${id}/address`)
      .then((response) => {
        setAddress(response.data);
      })
      .catch((error) => {
        console.log("Address error:", error);
      });
  };

  const loadManagers = () => {
    axios
      .get("http://54.204.231.101:5000/employees")
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.log("Managers error:", error);
      });
  };

  useEffect(() => {
    loadEmployee();
    loadAddress();
    loadManagers();
  }, [id]);
  useEffect(() => {
  const fetchManagers = async () => {
    try {
      const response = await fetch(
        "http://54.204.231.101:5000/employees"
      );

      const data = await response.json();

      setManagers(data);
    } catch (error) {
      console.error("FETCH MANAGERS ERROR:", error);
    }
  };

  fetchManagers();
}, []);

  // EMPLOYEE UPDATE
  const handleEmployeeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEmployee = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://54.204.231.101:5000/employees/${id}`,
        {
          name: employeeData.name,
          department: employeeData.department,
          salary: Number(employeeData.salary),
          email: employeeData.email,
        }
      );

      setEmployee(response.data.employee);
      setShowEmployeeForm(false);

      showMessage("Employee updated successfully!");
    } catch (error) {
      console.log("Update employee error:", error);
      showMessage("Failed to update employee.");
    }
  };

  // EMPLOYEE DELETE
  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(
        `http://54.204.231.101:5000/employees/${id}`
      );

      setShowDeleteConfirm(false);
      showMessage("Employee deleted successfully!");

      setTimeout(() => {
        navigate("/employees");
      }, 1500);
    } catch (error) {
      console.log("Delete employee error:", error);
      showMessage("Failed to delete employee.");
    }
  };

  // ADDRESS INPUT
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };
  

  // ADD ADDRESS
  const handleAddAddress = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://54.204.231.101:5000/employees/${id}/address`,
        addressData
      );

      setShowAddressForm(false);

      setAddressData({
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      loadAddress();

      showMessage(response.data.message);
    } catch (error) {
      console.log("Add address error:", error);
      showMessage("Failed to add address.");
    }
  };

  // OPEN ADDRESS UPDATE
  const openAddressEdit = (item: any) => {
    setSelectedAddressId(item.id);

    setAddressData({
      address: item.address,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });

    setShowAddressEditForm(true);
  };

  // UPDATE ADDRESS
  const handleUpdateAddress = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedAddressId) return;

    try {
      const response = await axios.put(
        `http://54.204.231.101:5000/employees/address/${selectedAddressId}`,
        addressData
      );

      setShowAddressEditForm(false);
      setSelectedAddressId(null);

      setAddressData({
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      loadAddress();

      showMessage(response.data.message);
    } catch (error) {
      console.log("Update address error:", error);
      showMessage("Failed to update address.");
    }
  };

  // OPEN ADDRESS DELETE
  const openAddressDelete = (addressId: number) => {
    setSelectedAddressId(addressId);
    setShowAddressDeleteConfirm(true);
  };

  // DELETE ADDRESS
  const handleDeleteAddress = async () => {
    if (!selectedAddressId) return;

    try {
      const response = await axios.delete(
        `http://54.204.231.101:5000/employees/address/${selectedAddressId}`
      );

      setShowAddressDeleteConfirm(false);
      setSelectedAddressId(null);

      loadAddress();

      showMessage(response.data.message);
    } catch (error) {
      console.log("Delete address error:", error);
      showMessage("Failed to delete address.");
    }
  };

  // UPDATE EMPLOYEE MANAGER
  const handleUpdateManager = async () => {
    try {
      const response = await axios.put(
        `http://54.204.231.101:5000/employees/${id}/manager`,
        {
          manager_id: selectedManagerId
            ? Number(selectedManagerId)
            : null,
        }
      );

      setEmployee(response.data.employee);
      setShowManagerForm(false);
      showMessage(
        response.data.message || "Employee manager updated successfully!"
      );
    } catch (error) {
      console.log("Update manager error:", error);
      showMessage("Failed to update employee manager.");
    }
  };

  // SUCCESS MESSAGE
  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (!employee) {
    return <h2>Loading employee details...</h2>;
  }

  return (
    <div>
      <h2>Employee Details</h2>

      {/* MESSAGE */}

      {message && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #c3e6cb",
          }}
        >
          ✅ {message}
        </div>
      )}

      {/* EMPLOYEE DETAILS */}

      <div>
        <p>
          <strong>ID:</strong> {employee.id}
        </p>

        <p>
          <strong>Name:</strong> {employee.name}
        </p>

        <p>
          <strong>Department:</strong> {employee.department}
        </p>

        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>

        <p>
          <strong>Email:</strong> {employee.email}
        </p>
      </div>

      <br />

      <button onClick={() => setShowEmployeeForm(true)}>
        ✏️ Update Employee
      </button>

      <button
        onClick={() => setShowDeleteConfirm(true)}
        style={{ marginLeft: "10px" }}
      >
        🗑️ Delete Employee
      </button>

      <hr />

      {/* EMPLOYEE MANAGER */}
      <h3>Employee Manager</h3>

      <p>
        <strong>Manager:</strong>{" "}
        {employee.manager_id
          ? managers.find(
              (manager) => manager.id === employee.manager_id
            )?.name || "Manager not found"
          : "Not Assigned"}
      </p>

      <button
        onClick={() => {
          setSelectedManagerId(
            employee.manager_id ? String(employee.manager_id) : ""
          );
          setShowManagerForm(true);
        }}
      >
        👔 {employee.manager_id ? "Change Manager" : "Add Manager"}
      </button>

      <hr />
<hr />
<hr />
      {/* ADDRESS */}

      <h3>Employee Address</h3>

      {address.length === 0 ? (
        <p>No address added yet.</p>
      ) : (
        address.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Address:</strong> {item.address}
            </p>

            <p>
              <strong>City:</strong> {item.city}
            </p>

            <p>
              <strong>State:</strong> {item.state}
            </p>

            <p>
              <strong>Pincode:</strong> {item.pincode}
            </p>

            <button onClick={() => openAddressEdit(item)}>
              ✏️ Update Address
            </button>

            <button
              onClick={() => openAddressDelete(item.id)}
              style={{ marginLeft: "10px" }}
            >
              🗑️ Delete Address
            </button>
          </div>
        ))
      )}

      <button onClick={() => setShowAddressForm(true)}>
        ➕ Add Address
      </button>

      {/* UPDATE EMPLOYEE POPUP */}

     {showEmployeeForm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        width: "420px",
        maxWidth: "90%",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h3>Update Employee</h3>

      <form onSubmit={handleUpdateEmployee}>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleEmployeeChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>Department</label>
        <input
          type="text"
          name="department"
          value={employeeData.department}
          onChange={handleEmployeeChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>Salary</label>
        <input
          type="number"
          name="salary"
          value={employeeData.salary}
          onChange={handleEmployeeChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleEmployeeChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <button type="submit">
          Update
        </button>

        <button
          type="button"
          onClick={() => setShowEmployeeForm(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  </div>
)}

      {/* DELETE EMPLOYEE POPUP */}

      {showDeleteConfirm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        width: "380px",
        maxWidth: "90%",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}
    >
      <h3>Delete Employee</h3>

      <p>
        Are you sure you want to delete{" "}
        <strong>{employee.name}</strong>?
      </p>

      <button
        onClick={handleDeleteEmployee}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "5px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Yes, Delete
      </button>

      <button
        onClick={() => setShowDeleteConfirm(false)}
        style={{
          padding: "10px 18px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
{/* MANAGER POPUP */}

{showManagerForm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        width: "420px",
        maxWidth: "90%",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      }}
    >

      <h3 style={{ textAlign: "center" }}>
        {employee.manager_id
          ? "Change Employee Manager"
          : "Add Employee Manager"}
      </h3>

      <label>Select Manager</label>

      <select
        value={selectedManagerId}
        onChange={(e) =>
          setSelectedManagerId(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          fontSize: "16px",
        }}
      >
        <option value="">
          -- Select Manager --
        </option>

        {managers
          .filter(
            (manager) => manager.id !== employee.id
          )
          .map((manager) => (
            <option
              key={manager.id}
              value={manager.id}
            >
              {manager.name} - {manager.department}
            </option>
          ))}
      </select>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <button onClick={handleUpdateManager}>
          Save Manager
        </button>

        <button
          type="button"
          onClick={() => setShowManagerForm(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

      {/* ADD ADDRESS POPUP */}

      {showAddressForm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        width: "420px",
        maxWidth: "90%",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h3>Add Employee Address</h3>

      <form onSubmit={handleAddAddress}>

        <label>Address</label>

        <input
          type="text"
          name="address"
          value={addressData.address}
          onChange={handleAddressChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>City</label>

        <input
          type="text"
          name="city"
          value={addressData.city}
          onChange={handleAddressChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>State</label>

        <input
          type="text"
          name="state"
          value={addressData.state}
          onChange={handleAddressChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <label>Pincode</label>

        <input
          type="text"
          name="pincode"
          value={addressData.pincode}
          onChange={handleAddressChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />

        <br />
        <br />

        <button type="submit">
          Add Address
        </button>

        <button
          type="button"
          onClick={() => setShowAddressForm(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  </div>
)}

      {/* UPDATE ADDRESS POPUP */}

      {showAddressEditForm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Update Employee Address</h3>

            <form onSubmit={handleUpdateAddress}>
              <label>Address</label>
              <br />
              <input
                type="text"
                name="address"
                value={addressData.address}
                onChange={handleAddressChange}
                required
              />

              <br />
              <br />

              <label>City</label>
              <br />
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
                required
              />

              <br />
              <br />

              <label>State</label>
              <br />
              <input
                type="text"
                name="state"
                value={addressData.state}
                onChange={handleAddressChange}
                required
              />

              <br />
              <br />

              <label>Pincode</label>
              <br />
              <input
                type="text"
                name="pincode"
                value={addressData.pincode}
                onChange={handleAddressChange}
                required
              />

              <br />
              <br />

              <button type="submit">Update Address</button>

              <button
                type="button"
                onClick={() => setShowAddressEditForm(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

            {/* DELETE ADDRESS POPUP */}

      {showAddressDeleteConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete Address</h3>

            <p>
              Are you sure you want to delete this address?
            </p>

            <button onClick={handleDeleteAddress}>
              Yes, Delete
            </button>

            <button
              onClick={() =>
                setShowAddressDeleteConfirm(false)
              }
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
            
          </div>
        </div>
      )}

    

    </div>
  );
};

export default EmployeeDetails;
