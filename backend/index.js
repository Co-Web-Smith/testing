const express = require('express')
const app = express()
const port = 5000
const { createServer } = require('http');
const { Server } = require('socket.io');






const server = createServer();
const io = new Server(server,{
    cors: {
        origin:'*',
        methods:["GET","POST"]
    }
});

app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!')
})



io.on('connection', async(socket) => {
  
socket.emit('me',socket.id);

socket.on("disconnect",()=>{
    socket.broadcast.emit("callended");
})

socket.on("calluser",({userToCall,signalData,from,name})=>{
    io.to(userToCall).emit("calluser",{signal:signalData,from,name});
})

socket.on("answercall",(data)=>{
    io.to(data.to).emit("callaccepted", data.signal);
})

});









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})