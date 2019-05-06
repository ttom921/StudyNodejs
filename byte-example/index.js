var app= require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
// 有client連線
io.on('connection',function(socket){
    socket.broadcast.emit('chat message','hi');
    console.log('an user connected');
    //client斷線
    socket.on('disconnect',function(){
        console.log('user disconnected');
    });
    socket.on('byte message',function(byteary){
        var bystring = byteary.toString();
        console.log('byte message: '+ bystring);
        //收到訊息後，回傳給自已
        io.emit('byte message',byteary);
    });
})
http.listen(3000,function(){
    console.log('listening on *:3000');
});