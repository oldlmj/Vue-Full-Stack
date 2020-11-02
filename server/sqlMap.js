// sql语句
var sqlMap = {
  user: {
    //添加用户
    add: 'insert into user(name, age) values (?, ?)',
    //add: "insert into user(name, age) values (?, ?)",
    //查询用户
    select: 'select * from user ',
    // select: 'select * from user where name like "%"?"%"',
    //select: 'select last_name from customers where last_name like "%"?"%"',
  },
  product: {
    select: 'select * from products'
  }
};
module.exports = sqlMap;
