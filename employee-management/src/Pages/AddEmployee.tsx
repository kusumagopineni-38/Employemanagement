import { useState } from "react";


function AddEmployee() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Sending employee data...");

      const response = await fetch("http://54.204.231.101:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          department,
          salary: Number(salary),
        }),
      });

      console.log("Response status:", response.status);

      const text = await response.text();

      console.log("Response:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        alert("Employee Added Successfully");

        setName("");
        setEmail("");
        setDepartment("");
        setSalary("");
      } else {
        alert(data.message || "Failed to Add Employee");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to server");
    }
  };

  return (
    <div className="add-employee-page">
      <div className="employee-card">

        <div className="form-header">
          <div className="form-icon">👤</div>

          <div>
            <h1>Add Employee</h1>
            <p>Enter employee details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="save-button">
            Save Employee
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
