import mysql from "mysql2";

// データベース接続情報
const cone = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Yama1106",
    database: "clothes",
  });

export default cone;