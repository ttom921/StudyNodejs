var app = require('express')();
var http = require('http').createServer(app);
var io  = require('socket.io')(http);


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

//有關Socket.IO的設定
//建立socket.io的namespace
var namespaces = [
    io.of('/nsp_chat'),
    io.of('/ns2'),
    io.of('/ns3')
];
for (i in namespaces) {
    namespaces[i].on('connection',handleConnection(namespaces[i]));  
}

function handleConnection(ns) {
    return function (socket){ //connection
    console.log("connected ");
    //socket.on('setUsername',setUsernameCallback(socket,ns));                       
    socket.on('disconnect', disconnectCallback(socket,ns));   
    socket.on('chatmessage',chatMessageCallback(socket,ns));                     
    //socket.on('messageChat',messageChatCallback(socket,ns));
    //socket.on('createJoinRoom',createJoinRoomCallback(socket,ns));  
 
   };
 }
 //斷線處理
 function disconnectCallback(socket,ns) {
     return function(msg){
     console.log("Disconnected ");
     socket.broadcast.send("It works!");
   };
 }
 // 聊天訊息
 function chatMessageCallback(socket,ns){
    return function(msg){
        console.log('chatmessage: '+ msg);
        socket.emit('chatmessage',msg);
    }
 }




//有關Socket.IO的處理
//有關chat
// 有client連線
// nsp_chat.on('connection',function(socket){
//     socket.broadcast.emit('chat message','hi');
//     console.log('an user connected');
//      //client斷線
//      nsp_chat.on('disconnect',function(){
//         console.log('user disconnected');
//     });
//     nsp_chat.on('chat message',function(msg){
//         console.log('message: '+ msg);
//         //收到訊息後，回傳給自已
//         socket.emit('chat message',msg);
//     });
// });


http.listen(3000,function(){
    console.log('listen on *:3000');
});