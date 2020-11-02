const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 增加用户
router.post('/addUser', (req, res) => {
  let sqlStr = sql.user.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.name, params.age], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

// 查詢用戶
router.post('/selectUser', (req, res) => {
  let sqlStr = sql.user.select;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.name], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});

//查詢使用者介面
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select;
  var params = req.body;
  console.log(params);
  if (params.name) {
    sql_name = "where username ='" + params.name + "'";
  }
  var keywords = JSON.parse(Object.keys(params)[0]);
  conn.query(sql_name, params.name, function (err, result) {
    if (err) {
      console.log(err);
    }
    // console.log(result);
    if (result[0] === undefined) {
      res.send('-1')   //查詢不出username，data 返回-1
    } else {
      var resultArray = result[0];
      console.log(resultArray.password);
      // console.log(keywords);
      if (resultArray.password === keywords.password) {
        jsonWrite(res, result);
      } else {
        res.send('0')   //username
      }
    }
  })
});
// 查詢商品
router.get('/selectProduct', (req, res) => {
  let sqlStr = sql.product.select;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.name], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  conn.end();
});
module.exports = router;
