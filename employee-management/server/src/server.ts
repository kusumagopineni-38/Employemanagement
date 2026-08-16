import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});