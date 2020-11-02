// 資料庫連接池
const mysql = require("mysql");

class DBHelper {
  // 獲取資料庫連接
  getConn() {
    let conn = mysql.createConnection({
      // 資料庫連接配置
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "root",
      database: "northwind", // 資料庫名稱
    });
    conn.connect();
    return conn;
  }
}

module.exports = DBHelper;
