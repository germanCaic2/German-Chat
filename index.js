import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Server } from 'socket.io';

const SERVER_PORT = 8080;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//static files
app.use(express.static(path.join(__dirname, 'public')));

// server start
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server on port ${SERVER_PORT}`);
});

// socket io
const socket = new Server();
const io = socket.listen(server);

io.on('connection', (socket) => {
  console.log('New Connection whit ID:', socket.id);

  socket.on('client:message', (data) => {
    io.sockets.emit('client:message', data);
  });

  socket.on('client:typing', (data)=>{
    socket.broadcast.emit('client:typing', data);
  });
});
