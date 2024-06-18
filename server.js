const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize the express app
const app = express();

// Enable CORS
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server with CORS settings
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow all origins (adjust as necessary)
    methods: ['GET', 'POST']
  }
});

// Handle connection event
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle custom event from client
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    // Broadcast message to all connected clients
    io.emit('chat message', msg);
    io.emit("connect", "User Connected");
  });

  // Handle disconnection event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

