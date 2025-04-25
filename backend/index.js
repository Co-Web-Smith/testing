const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const server = createServer(app); // Attach Express to the server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

io.on("connection", (socket) => {

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callended");
    });
    
  
    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
       
        io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    });


    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
