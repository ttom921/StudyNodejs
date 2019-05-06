var app = require('express')();
var http = require('http').createServer(app);

app.get('/',function(req,res){
    res.send('<h1>Hello express</h1>')
})

app.listen(3000,function(){
    console.log('listening on *:3000');
})