import pool from "../config/dataBase.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const postUser = async (req, res) => {
  try {
    const { user_id, user_email, user_password } = req.body;
    const user = await pool.query(
      `INSERT INTO users (user_id, user_email, user_password) VALUES($1, $2, $3) RETURNING *`,
      [user_id, user_email, user_password]
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
};
