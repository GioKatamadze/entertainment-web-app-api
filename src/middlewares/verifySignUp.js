import pool from "../config/dataBase.js";

export const checkDuplicateEmail = (req, res, next) => {
  const allUsers = pool.query("SELECT * FROM users");
  allUsers
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
};
