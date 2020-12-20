const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.todo_db_host || "localhost",
  port: process.env.todo_db_port || 3306,
  database: process.env.todo_db_scheme || "todo",
  user: process.env.todo_db_user || "todo",
  password: process.env.todo_db_password || "todo",
});

module.exports = pool
