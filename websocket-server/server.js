//import express 和 ws套件
const express = require('express');
const SocketServer = require('ws').Server;
const fs = require('fs');
//指定開啟的 port
const PORT = 3000;
let data = null;
//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express().listen(PORT, () => {
    data = fs.readFileSync('test_Image.png');
    //process.stdout.write(data);
    let bindata = data.toString('binary');
    // do something with bindata
    let hexdata = new Buffer(bindata, 'ascii').toString('hex');
    console.log(`data=>${hexdata}`);
    console.log(`Listening on ${PORT}`);
});

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {
    //連結時執行此 console 提示
    console.log('Client connected');

    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', data => {
        console.log(`server recive data=${data}`);
        // //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        // ws.send(data);
    });
    ws.send(data);




    ws.on('close', () => {
        console.log(`Close connected`);
    });
});