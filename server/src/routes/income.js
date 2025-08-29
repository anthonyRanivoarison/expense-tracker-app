import express from "express";
import {
  getIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";

const IncomeRouter = express.Router();


IncomeRouter.get("/", getIncomes);
IncomeRouter.get("/:id", getIncomeById);
IncomeRouter.post("/", createIncome);
IncomeRouter.put("/:id", updateIncome);
IncomeRouter.delete("/:id", deleteIncome);

export default IncomeRouter;
