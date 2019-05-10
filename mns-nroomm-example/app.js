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
    var ip = socket.conn.remoteAddress;
    console.log('default_ns:a user connected IP:'+ip);
    socket.on('disconnect', function () {
        console.log('default_ns:user disconnected');
    });

    
});

var namespaces = [
    io.of('/aaa-123'),
    io.of('/bbb-123'),
    io.of('/ccc-123'),
];
var ns_name = namespaces[0];
ns_name.on('connection',function(socket){
    
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
    //收到二進位資料
    socket.on('bytemessage',function(data){

        //console.log('<bytemessage> :' + ' room:'+data.room);
        ns_name.to(data.room).emit('bytemessage',data);
    });
});

