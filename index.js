const {Server} = require('socket.io');
const path =require('path');
const express=require("express");
const app=express();
const http=require("http");
const server=http.createServer(app);
const io=new Server(server);
console.log("hii");
app.get("/",(req,res)=>{
    console.log("hii2");
    app.use(express.static(path.join(__dirname,"./public")));
    res.sendFile(__dirname+"/public/index.html");
})
const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
        
});

})
const port=process.env.PORT;
server.listen(port);
console.log("app is running at port ",port);
