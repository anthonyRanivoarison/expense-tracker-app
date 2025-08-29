import pool from "../db.js";

const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1 ORDER BY name ASC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const result = await pool.query(
      "INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *",
      [name, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const old = await pool.query(
      "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (old.rows.length === 0) return res.status(404).json({ message: "Category not found" });

    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await pool.query(
      "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (category.rows.length === 0) return res.status(404).json({ message: "Category not found" });

    const usage = await pool.query(
      "SELECT COUNT(*) FROM expenses WHERE category_id = $1",
      [id]
    );
    if (parseInt(usage.rows[0].count) > 0)
      return res.status(400).json({ message: "Cannot delete category in use" });

    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

export { getCategories, createCategory, updateCategory, deleteCategory };
