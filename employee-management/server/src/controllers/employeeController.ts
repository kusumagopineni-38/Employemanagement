import { Request, Response } from "express";
import pool from "./database";

// GET ALL EMPLOYEES
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// GET EMPLOYEE BY ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM employees WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("GET EMPLOYEE ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// ADD EMPLOYEE
export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { name, department, salary, email } = req.body;

    const result = await pool.query(
      `INSERT INTO employees (name, department, salary, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, department, salary, email]
    );

    res.status(201).json({
      message: "Employee added successfully",
      employee: result.rows[0]
    });

  } catch (error) {
    console.error("ADD EMPLOYEE ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// UPDATE EMPLOYEE
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, department, salary, email } = req.body;

    const result = await pool.query(
      `UPDATE employees
       SET name = $1,
           department = $2,
           salary = $3,
           email = $4
       WHERE id = $5
       RETURNING *`,
      [name, department, salary, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: result.rows[0]
    });

  } catch (error) {
    console.error("UPDATE EMPLOYEE ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// DELETE EMPLOYEE
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: result.rows[0]
    });

  } catch (error) {
    console.error("DELETE EMPLOYEE ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};
// GET EMPLOYEE ADDRESS
export const getEmployeeAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM employee_addresses WHERE employee_id = $1",
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET EMPLOYEE ADDRESS ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// ADD EMPLOYEE ADDRESS
export const addEmployeeAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address, city, state, pincode } = req.body;

    const result = await pool.query(
      `INSERT INTO employee_addresses
       (employee_id, address, city, state, pincode)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, address, city, state, pincode]
    );

    res.status(201).json({
      message: "Employee address added successfully",
      address: result.rows[0]
    });
  } catch (error) {
    console.error("ADD EMPLOYEE ADDRESS ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// UPDATE EMPLOYEE ADDRESS
export const updateEmployeeAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const { address, city, state, pincode } = req.body;

    const result = await pool.query(
      `UPDATE employee_addresses
       SET address = $1,
           city = $2,
           state = $3,
           pincode = $4
       WHERE id = $5
       RETURNING *`,
      [address, city, state, pincode, addressId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    res.status(200).json({
      message: "Employee address updated successfully",
      address: result.rows[0]
    });
  } catch (error) {
    console.error("UPDATE EMPLOYEE ADDRESS ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};


// DELETE EMPLOYEE ADDRESS
export const deleteEmployeeAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;

    const result = await pool.query(
      "DELETE FROM employee_addresses WHERE id = $1 RETURNING *",
      [addressId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    res.status(200).json({
      message: "Employee address deleted successfully",
      address: result.rows[0]
    });
  } catch (error) {
    console.error("DELETE EMPLOYEE ADDRESS ERROR:", error);

    res.status(500).json({
      message: "Database Error"
    });
  }
};
export const updateEmployeeManager = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { manager_id } = req.body;

    const result = await pool.query(
      `UPDATE employees
       SET manager_id = $1
       WHERE id = $2
       RETURNING *`,
      [manager_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee manager updated successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE MANAGER ERROR:", error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};