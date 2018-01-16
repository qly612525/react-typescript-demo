const http = require('http');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const iconv = require('iconv-lite');
const DOMParser = require('xmldom').DOMParser;
const reqOpts = require('../videoconfig');

const mysql = require('mysql');
const config = require('../dbconfig').mysql;

const conn = mysql.createConnection(config);

// 打开连接
conn.connect();

// 请求部分
const req = http.request(reqOpts, function (res) { 
    
    const convertStream = iconv.decodeStream('GB2312');
    res.pipe(convertStream);

    let data = '';

    const stime = new Date();
    console.log(`${stime.toLocaleDateString()} ${stime.toLocaleTimeString()}: start sync video data`);
    convertStream.on('data', function (chunk) { 
        data += chunk;
        console.log("loading data... ");
    });

    res.on('end', function () {
        const etime = new Date();
        console.log(`${etime.toLocaleDateString()} ${etime.toLocaleTimeString()}: finish sync video data`);

        const doc = new DOMParser().parseFromString(data, 'text/xml');
        const devices = doc.getElementsByTagName('deviceInfo');
        const len = devices.length;
        const outputArr = [];

        const queryStr = 'INSERT INTO v_devices(did, name, o_x, o_y, address, type, o_status, o_time) values(?,?,?,?,?,?,?,?);';

        for (let i = 0; i < len; i++) {
            const device = devices[i];
            // 获取设备的其他信息
            const id = getNodeValue(device, 'deviceid');
            const name = getNodeValue(device, 'devicename');
            const x = getNodeValue(device, 'longitude');
            const y = getNodeValue(device, 'latitude');
            const status = getNodeValue(device, 'status');
            const address = getNodeValue(device, 'adress');
            const devicetype = getNodeValue(device, 'cameratype');
            const updateTime = Date.now();
            outputArr.push({
                id, name, x, y, status, address, devicetype, updateTime
            });
        }

        // 导入数据
        outputArr.map(function (l) { 
            conn.query(queryStr,  [l.id, l.name, l.x, l.y, l.address, l.devicetype, l.status, l.updateTime], function (err, rows, fields) {
                if (err) throw err;
                console.log(`finish insert id --${l.id}--`);
            });
        });

        // 关闭连接
        conn.end(function () {
            console.log("finish insert dbs");
        });
    });
});

// 异常处理
req.on('error', function (err) { 
    console.error('同步数据出错' + err);
});

req.end();

function getNodeValue(node, tagName) {
    return node.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function toArray(line) {
    const id = line.id;
    const name = line.name;
    const x = line.x;
    const y = line.y;
    const address = line.address;
    const type = line.devicetype;
    return [id, name, x, y, address, type];
}

