var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// 服務那一個Port
http.listen(3000, function () {
    console.log('listen on *:3000');

});
//首頁
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});
//建立room
let registeredRooms = ["room1", "room2", "room3","room4"]; 

//default namespace
io.on('connection', function (socket) {
    console.log('default_ns:a user connected');
    socket.on('disconnect', function () {
        console.log('default_ns:user disconnected');
    });

    // socket.on('chat message', function (msg) {
    //     console.log(msg);
    //     io.emit('chat message', msg);
    // });
});

//printer namespace
// var nsPrinters = io.of("/A4D90C-printers");
// nsPrinters.on('connection', function (socket) {
//     socket.on('connect', function (msg) {
//         console.log("PRN: connect: ",socket.id);
//     });

//     socket.on('getInfo', function (msg) {
//         socket.emit("info", "response for printer.getInfo(" + msg + ")");
//     });

//     socket.on('disconnect', function () {
//         //nsp.emit("chat message", name+": disconnection");
//     });
// });
var namespaces = [
    io.of('/aaa-123'),
    io.of('/bbb-123'),
    io.of('/ccc-123'),
];
var ns_name = namespaces[0];
ns_name.on('connection',function(socket){
    // socket.on('connect',function(socket){
    //     console.log("PRN: connect: ",socket.id);
    //     socket.emit('connect','ssssss');
    // });
    // 取得房間
    socket.on('getRooms',function(msg){
        console.log("<getRooms>: ",ns_name.name);
        socket.emit('rooomsData',registeredRooms);
    });
    // 加入房間
    socket.on('createJoinRoom', function (room) {
        console.log('<createJoinRoom> :' + room);
        if (registeredRooms.includes(room)) {
            //socket已加入房間
            socket.emit('success', room);
            console.log('有效房間名:' + room);
            socket.join(room);
        } else {
            // 沒有此房間
            socket.emit('err', room);
            console.log('無效房間名:' + room);
        }
    });
    //收到聊天訊息
    socket.on('chatmessage',function(data){
        console.log('<chatmessage> :' + 'msg:'+data.msg + ' room:'+data.room);
        ns_name.to(data.room).emit('chatmessage',data);
    });
});


// // 有關Soket.io的設定
// // 建立Socket.io的namespace
// var namespaces = [
//     io.of('/aaa-123'),
//     io.of('/bbb-123'),
//     io.of('/ccc-123'),
// ];
// namespaces[0].on('connection', function (socket) {
//      // 連線事件
//     socket.on('connect', function (msg) {
//         console.log('server端:ns='+ns.name+'<connect> client:'+socket.id);
//     });
// });
// //建立回調函數
// for (i in namespaces) {
//     namespaces[i].on('connection',handleConnection(namespaces[i]));  
// }
// //建立room
// let registeredRooms = ["room1", "room2", "room3","room4"]; 
// function handleConnection(ns){
//     return function(socket){
//         // 連線事件
//         console.log('server端:ns='+ns.name+'<connection> client:'+socket.id);
//         // // 傳給客戶端 connection 事件
//         socket.emit('connection',registeredRooms);
//         // // 斷線處理
//         // socket.on('disconnect',disconnectCallback(socket,ns));
//         // // 聊天處理
//         // socket.on('chatmessage',chatmessageCallback(socket,ns));
//         // 加入房間
//         socket.on('createJoinRoom',createJoinRoomCallback(socket,ns));
        
       
//     };
// }

// // 加入房間
// function createJoinRoomCallback(socket, ns) {
//     return function (room) {
//         console.log('加入房間.. :' + room);
//         if (registeredRooms.includes(room)) {
//             //socket已加入房間
//             socket.emit('success', '有效房間名:' + room);
//         } else {
//             // 沒有此房間
//             socket.emit('err', '無效房間名:' + room);
//         }
//     }
// }


// //建立room
// let registeredRooms = ["room1", "room2", "room3","room4"]; 
// io.of('/aaa123').on('connection',function(socket){
//     console.log(socket.id);
//     console.log(io.of('/aaa123').name+'連線');
//     // 傳給客戶端 connection 事件
//     socket.emit('connection',registeredRooms);
//     // // 加入房間
//     socket.on('createJoinRoom',function(room){
//          console.log('加入房間.. :' + room);
//          if (registeredRooms.includes(room)) {
//               //socket已加入房間
//               socket.emit('success',room);
//               console.log('有效房間名:' + room);
//           } else {
//               // 沒有此房間
//               socket.emit('err',  room);
//               console.log('無效房間名:' + room);
//           }
//     });
//     socket.on('disconnect',function (){
//         console.log('server斷線-client:socket.id='+socket.id);
//         // 傳給客戶端 disconnect 事件
//         //var msg='訊息從server:斷線'
//         //socket.emit('disconnect',msg);
//     });
//     socket.in(registeredRooms[0]).on('bytemessage',function(bufdata,room){
//         console.log('傳送:bytemessage room:'+room);
//         socket.emit("bytemessage", bufdata,room);

//     });

// });
// io.of('/aaa-123').on('disconnect',function(socket){
//      console.log('server斷線-client:socket.id='+socket.id);
//         // 傳給客戶端 disconnect 事件
//         var msg='訊息從server:斷線'
//         socket.emit('disconnect',msg);
// });



// //建立回調函數
// for (i in namespaces) {
//     namespaces[i].on('connection',handleConnection(namespaces[i]));  
// }

// function handleConnection(ns){
//     return function(socket){
//         console.log('連線');
//         // 傳給客戶端 connection 事件
//         socket.emit('connection',registeredRooms);
//         // 斷線處理
//         socket.on('disconnect',disconnectCallback(socket,ns));
//         // 聊天處理
//         socket.on('chatmessage',chatmessageCallback(socket,ns));
        
//         // 加入房間
//         socket.on('createJoinRoom',createJoinRoomCallback(socket,ns));
//         // 二進位資料傳送
//         //socket.on('bytemessage',bytemessageCallback(socket,ns));
//         socket.in(registeredRooms[0]).on('bytemessage',channelmsgCallback(socket,ns));
//         socket.in(registeredRooms[1]).on('bytemessage',channelmsgCallback(socket,ns));
//         //socket.in(registeredRooms[0]).emit('bytemessage',function(bufdata){
            
//         //});
//     };
// }
// function  channelmsgCallback(socket,ns){
//     return function(bufdata,room){
//         console.log('channel bytemessage :'+ room);
        
//         socket.in(room).emit('bytemessage',bufdata);
//         //socket.emit('bytemessage',bufdata,room);
//     }
// }  
// // 二進位資料傳送
// // function bytemessageCallback(socket,ns){
// //     return function(bufdata){
// //         console.log('bytemessage ');
// //         socket.emit('bytemessage',bufdata);
// //     }
// // }
// // 加入房間
// function createJoinRoomCallback(socket, ns) {
//     return function (room) {
//         console.log('加入房間.. :' + room);
//         if (registeredRooms.includes(room)) {
//             //socket已加入房間
//             socket.emit('success', '有效房間名:' + room);
//         } else {
//             // 沒有此房間
//             socket.emit('err', '無效房間名:' + room);
//         }
//     }
// }
// // 聊天處理
// function chatmessageCallback(socket, ns) {
//     return function(msg){
//         console.log('chatmessage:'+msg);
//         socket.emit('chatmessage',msg);
//     }
// }
// // 斷線處理
// function disconnectCallback(socket, ns) {
//     return function(msg){
//         console.log("斷線 ");
//         //socket.broadcast.send("It works!");
//     }
// }

