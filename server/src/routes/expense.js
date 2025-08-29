import express from "express";
import multer from "multer";
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";

const ExpenseRouter = express.Router();

const upload = multer({ dest: "uploads/receipts/" });

ExpenseRouter.get("/", getExpenses);
ExpenseRouter.get("/:id", getExpenseById);
ExpenseRouter.post("/", upload.single("receipt"), createExpense);
ExpenseRouter.put("/:id", upload.single("receipt"), updateExpense);
ExpenseRouter.delete("/:id", deleteExpense);

export default ExpenseRouter;
