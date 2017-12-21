var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../dbconfig').mysql;

const conn = mysql.createConnection(config);

// 打开连接
conn.connect();

// 查询字符串
const getAll = 'SELECT * FROM v_devices;';
const getCamera = 'SELECT * FROM v_devices where did=?;';
const updateCoordByCameraId = 'UPDATE v_devices SET n_x=?,n_y=? WHERE did=?;';
const updateNameByCameraId = 'UPDATE v_devices SET name=? WHERE did=?;';
const updateAddressByCameraId = 'UPDATE v_devices SET address=? WHERE did=?;';
const updateFlagByCameraId = 'UPDATE v_devices SET flag=? WHERE did=?;';


/* GET users listing. */
router.get('/list', function (req, res, next) {
    conn.query(getAll, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/:cameraid', function (req, res, next) {
    const cameraid = req.params.cameraid || 0;
    conn.query(getCamera, [cameraid.toString()], function (err, rows, fields) {
        if (err) throw err;
        res.json({status: 'OK', rows: rows});
    });
});

router.post('/:cameraid/coordinates', function (req, res, next) { 
    const cameraid = req.params.cameraid || null;
    const { long, lat } = req.body;
    if (!cameraid) throw new Error('传入的设备ID不能为空！');
    conn.query(updateCoordByCameraId, [parseFloat(long), parseFloat(lat), cameraid], function (err, rows, fields) {
        if (err) throw err;
        if (typeof rows === 'object') res.json({status: 'OK', changedNum: rows.changedRows, rows: []});
        else res.json(rows);
    });
});

router.post('/:cameraid/name', function (req, res, next) { 
    const cameraid = req.params.cameraid || null;
    const { name } = req.body;
    if (!cameraid) throw new Error('传入的设备ID不能为空！');
    conn.query(updateNameByCameraId, [name, cameraid], function (err, rows, fields) {
        if (err) throw err;
        if (typeof rows === 'object') res.json({status: 'OK', changedNum: rows.changedRows, rows: []});
        else res.json(rows);
    });
});

router.post('/:cameraid/address', function (req, res, next) { 
    const cameraid = req.params.cameraid || null;
    const { address } = req.body;
    if (!cameraid) throw new Error('传入的设备ID不能为空！');
    conn.query(updateAddressByCameraId, [address, cameraid], function (err, rows, fields) {
        if (err) throw err;
        if (typeof rows === 'object') res.json({status: 'OK', changedNum: rows.changedRows, rows: []});
        else res.json(rows);
    });
});

router.post('/:cameraid/flag', function (req, res, next) { 
    const cameraid = req.params.cameraid || null;
    const { flag } = req.body;
    if (!cameraid) throw new Error('传入的设备ID不能为空！');
    conn.query(updateFlagByCameraId, [flag, cameraid], function (err, rows, fields) {
        if (err) throw err;
        if (typeof rows === 'object') res.json({status: 'OK', changedNum: rows.changedRows, rows: []});
        else res.json(rows);
    });
});

module.exports = router;