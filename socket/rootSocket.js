const rootSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`New visitor ⚡: ${socket.id}`);
    
        socket.on('message', (data) => {
            socketIO.emit('messageResponse', data);
        });
    
        socket.on('newUser', (data) => {
            users.push(data);
            socketIO.emit('newUserResponse', users);
        });
    
        socket.on('diceRoll', (data) => {
            socketIO.emit('diceRollResponse', data);
        });
    
        socket.on('disconnect', () => {
            console.log('🔥A user disconnected');
            users = users.filter((user) => user.socketID !== socket.id);
            socketIO.emit('newUserResponse', users);
            socket.disconnect();
        });
    });
};

module.exports = rootSocket;