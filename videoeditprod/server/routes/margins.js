var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../dbconfig').mysql;

const conn = mysql.createConnection(config);

// 打开连接
conn.connect();

// 查询字符串
const getAll = 'SELECT * FROM v_margins;';
const updateVideo = 'UPDATE v_margins SET x=?,y=? WHERE id=?;';

router.get('/list', function (req, res, next) {
    conn.query(getAll, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.post('/:cameraid', function (req, res, next) {
    const cameraid = req.params.cameraid;
    const { x, y } = req.body;
    conn.query(updateVideo, [parseFloat(x), parseFloat(y), parseInt(cameraid)], function (err, rows, fields) {
        if (err) throw err;
        res.json({ status: 'OK', data: rows });
    });
});

module.exports = router;