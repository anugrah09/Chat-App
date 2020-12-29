const express = require("express")
const app = express()
const port = 80;

app.use(express.static('public'));
let server = app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
let io = require("socket.io")(server);
io.on('connection', (socket)=>{
    // console.log(`new connection: ${socket.id}`)
    socket.on('comment', (data)=>{
        // console.log(data);
        date.time = Date();
        socket.broadcast.emit('comment', data);
    })
    socket.on('typing', (username)=>{
        socket.broadcast.emit('typing', username);
    })
})

