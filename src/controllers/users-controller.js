import pool from "../config/dataBase.js";

async function isUserExists(email) {
  return new Promise((resolve) => {
    pool.query(
      "SELECT * FROM users WHERE Email = $1",
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
      "SELECT * FROM users WHERE Email = $1",
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
  const { id, email, password } = request.body;

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
          "INSERT INTO users (id, email, password) VALUES ($1, $2, $3)",
          [id, email, encryptedPassword],
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
