import pool from "../config/dataBase.js";

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllMovies;
