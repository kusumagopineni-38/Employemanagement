import { Pool } from "pg";

const pool = new Pool({
  host: "35.154.251.9",
  port: 5432,
  user: "postgres",
  password: "Augustus@8911",
  database: "employee_db",
});

export default pool;