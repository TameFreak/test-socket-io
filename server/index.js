require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const { config, socketEvents } = require('../shared');

const messages = [];

app.use(express.static('dist'));

app.get('**', (req, res) => {
    res.sendFile('index.html');
});

io.sockets.on('connection', socket => {
    socket.emit(socketEvents.GET_MESSAGES, { messages });

    socket.on(socketEvents.SEND_MESSAGE, message => {
        io.sockets.emit(socketEvents.ADD_NEW_MESSAGE, { message });
        messages.push(message);
    });
});

server.listen(config.SOCET_PORT);
app.listen(config.API_PORT);
