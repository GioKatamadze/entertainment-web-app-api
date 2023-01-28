import pool from "../config/dataBase.js";

async function isUserExists(email) {
  return new Promise((resolve) => {
    pool.query(
      "SELECT * FROM Users WHERE Email = $1",
      [email],
      (error, results) => {
        if (error) {
          throw error;
        }
        return resolve(results.rowCount > 0);
      }
    );
  });
}

async function getUser(email) {
  return new Promise((resolve) => {
    pool.query(
      "SELECT * FROM Users WHERE Email = $1",
      [email],
      (error, results) => {
        if (error) {
          throw error;
        }

        return resolve(results.rows[0]);
      }
    );
  });
}

//

export const signUp = (request, response) => {
  const { email, password } = request.body;

  isUserExists(email).then(
    (isExists) => {
      if (isExists) {
        return response
          .status(400)
          .json({ status: "failed", message: "Email is taken." });
      }

      bcrypt.hash(password, 10, (error, encryptedPassword) => {
        if (error) {
          throw error;
        }

        pool.query(
          "INSERT INTO Users (email, password) VALUES ($1, $2)",
          [email, encryptedPassword],
          (error) => {
            if (error) {
              return response
                .status(400)
                .json({ status: "failed", message: error.code });
            }

            getUser(email).then((user) => {
              user = {
                id: user.id,
                email: user.email,
              };
              response.status(201).json(user);
            });
          }
        );
      });
    },
    (error) => {
      response.status(400).json({
        status: "failed",
        message: "Error while checking is user exists.",
      });
    }
  );
};

export const signIn = (request, response) => {
  const { email, password } = request.body;

  isUserExists(email).then(
    (isExists) => {
      if (!isExists) {
        return response
          .status(401)
          .json({ status: "failed", message: "Invalid email or password!" });
      }

      getUser(email).then((user) => {
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (error) {
            throw error;
          }

          if (!isValid) {
            return response.status(401).json({
              status: "failed",
              message: "Invalid email or password!",
            });
          }

          response
            .status(200)
            .json({ status: "success", message: "Login successfully!" });
        });
      });
    },
    (error) => {
      response
        .status(400)
        .json({ status: "failed", message: "Error while login." });
    }
  );
};

export const getAllUsers = async (_, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
};

// export const signUp = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!(email && password)) {
//       res.status(400).send("All input is required");
//     }

//     const user = await pool.query(
//       `INSERT INTO users (email, password)` + `VALUES($1, $2) RETURNING *`,
//       [email, password]
//     );
//     res.json(user.rows);
//     pool.end;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// ...

// export const signIn = async (req, res) => {
//   const allUsers = await pool.query("SELECT * FROM users");
//   allUsers
//     .findOne({
//       where: {
//         email: req.body.email,
//       },
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       let passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       let token = jwt.sign({ id: user.email }, config.secret, {
//         expiresIn: 86400, // 24 hours
//       });

//       res.status(200).send({
//         email: user.email,
//         accessToken: token,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };
