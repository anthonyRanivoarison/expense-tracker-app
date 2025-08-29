import pool from "../db.js";

const getIncomes = async (req, res) => {
  try {
    const { start, end } = req.query;
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

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM incomes ${whereClause} ORDER BY date DESC`;
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching incomes" });
  }
};

const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM incomes WHERE id = $1 AND user_id = $2";
    const result = await pool.query(query, [id, req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income" });
  }
};

const createIncome = async (req, res) => {
  try {
    const { amount, date, source, description } = req.body;

    const query = `
      INSERT INTO incomes (amount, date, source, description, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const values = [amount, date, source || null, description || null, req.user.id];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating income" });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, source, description } = req.body;

    const old = await pool.query("SELECT * FROM incomes WHERE id = $1 AND user_id = $2", [id, req.user.id]);
    if (old.rows.length === 0) return res.status(404).json({ message: "Income not found" });

    const query = `
      UPDATE incomes
      SET amount = $1,
          date = $2,
          source = $3,
          description = $4
      WHERE id = $5
      RETURNING *`;

    const values = [
      amount || old.rows[0].amount,
      date || old.rows[0].date,
      source || old.rows[0].source,
      description || old.rows[0].description,
      id
    ];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating income" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM incomes WHERE id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Income not found" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting income" });
  }
};

export { getIncomes, getIncomeById, createIncome, updateIncome, deleteIncome };
