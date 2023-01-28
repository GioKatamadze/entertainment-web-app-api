import pool from "../config/dataBase.js";

export const getAllUsers = async (_, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      `INSERT INTO users (email, password)` + `VALUES($1, $2) RETURNING *`,
      [email, bcrypt.hashSync(password, 8)]
    );
    res.json(user.rows);
    pool.end;
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = async (req, res) => {
  const allUsers = await pool.query("SELECT * FROM users");
  allUsers
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.email }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
