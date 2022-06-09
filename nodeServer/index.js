const io = require('socket.io')(3000);

const users={}
console.log('hello');
io.sockets.on('connection',socket => {
    console.log('hello2');
    socket.on('new-user-joined',name => {
        console.log(name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message => {
        socket.broadcast.emit('receive',{ message : message, name : users[socket.id]});
    })
    socket.on('disconnect',name => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
