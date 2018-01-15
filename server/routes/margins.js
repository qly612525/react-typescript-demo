var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../dbconfig').mysql;

const conn = mysql.createConnection(config);

// 打开连接
conn.connect();

// 查询字符串
const getAll = 'SELECT * FROM v_margins;';

router.get('/list', function (req, res, next) {
    conn.query(getAll, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

module.exports = router;