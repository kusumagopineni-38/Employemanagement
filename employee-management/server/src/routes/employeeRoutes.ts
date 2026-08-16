import express from "express";

import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeAddress,
  addEmployeeAddress,
  updateEmployeeAddress,
  deleteEmployeeAddress,
  updateEmployeeManager,
} from "../controllers/employeeController";

const router = express.Router();


// Employee CRUD
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


// Employee Manager
router.put("/:id/manager", updateEmployeeManager);


// Employee Address CRUD
router.get("/:id/address", getEmployeeAddress);
router.post("/:id/address", addEmployeeAddress);
router.put("/address/:addressId", updateEmployeeAddress);
router.delete("/address/:addressId", deleteEmployeeAddress);


export default router;