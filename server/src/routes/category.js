import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/", getCategories);
CategoryRouter.post("/", createCategory);
CategoryRouter.put("/:id", updateCategory);
CategoryRouter.delete("/:id", deleteCategory);

export default CategoryRouter;
