import pkg from "pg";
const { Pool } = pkg;

// const pool = new Pool({
//   user: `${process.env.PGUSER}`,
//   password: `${process.env.PGPASSWORD}`,
//   host: `${process.env.PGHOST}`,
//   port: `${process.env.PGPORT}`,
//   database: `${process.env.PGDATABASE}`,
// });

const pool = new Pool({
  user: `postgres`,
  password: `K11Ddbogf2rYd8AkvQ3O`,
  host: `containers-us-west-80.railway.app`,
  port: `7873`,
  database: `railway`,
});

export default pool;
