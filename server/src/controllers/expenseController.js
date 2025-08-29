import fs from "fs";
import pool from "../db.js";


const getExpenses = async (req, res) => {
  try {
    const { start, end, category, type } = req.query;
    const conditions = ["user_id = $1"];
    const values = [req.user.id]; 

    if (start) {
      values.push(start);
      conditions.push(`date >= $${values.length}`);
    }
    if (end) {
      values.push(end);
      conditions.push(`date <= $${values.length}`);
    }
    if (category) {
      values.push(category);
      conditions.push(`category_id = $${values.length}`);
    }
    if (type) {
      values.push(type);
      conditions.push(`type = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM expenses ${whereClause} ORDER BY date DESC`;
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM expenses WHERE id = $1 AND user_id = $2";
    const result = await pool.query(query, [id, req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching expense" });
  }
};

const createExpense = async (req, res) => {
  try {
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const receiptPath = req.file ? req.file.path : null;

    const query = `
      INSERT INTO expenses
        (amount, date, category_id, description, type, start_date, end_date, receipt_path, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`;

    const values = [
      amount,
      date,
      categoryId,
      description || null,
      type || "one-time",
      startDate || null,
      endDate || null,
      receiptPath,
      req.user.id,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating expense" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const receiptPath = req.file ? req.file.path : null;

    const old = await pool.query("SELECT * FROM expenses WHERE id = $1 AND user_id = $2", [id, req.user.id]);
    if (old.rows.length === 0) return res.status(404).json({ message: "Expense not found" });

    if (receiptPath && old.rows[0].receipt_path) {
      fs.unlink(old.rows[0].receipt_path, (err) => {
        if (err) console.warn("Cannot delete old receipt:", err.message);
      });
    }

    const query = `
      UPDATE expenses
      SET amount = $1,
          date = $2,
          category_id = $3,
          description = $4,
          type = $5,
          start_date = $6,
          end_date = $7,
          receipt_path = COALESCE($8, receipt_path)
      WHERE id = $9
      RETURNING *`;

    const values = [
      amount || old.rows[0].amount,
      date || old.rows[0].date,
      categoryId || old.rows[0].category_id,
      description || old.rows[0].description,
      type || old.rows[0].type,
      startDate || old.rows[0].start_date,
      endDate || old.rows[0].end_date,
      receiptPath,
      id,
    ];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating expense" });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Expense not found" });

    if (result.rows[0].receipt_path) {
      fs.unlink(result.rows[0].receipt_path, (err) => {
        if (err) console.warn("Cannot delete receipt:", err.message);
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting expense" });
  }
};

export { getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense };