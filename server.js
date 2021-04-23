const app = require('./app.js');
const port = 3000;

app.listen( port, function(){
    console.log('Express listening on port', port);
});

//server side socket io
const listen = require('socket.io');
const io = listen(server);
io.on('connection', (socket)=>{
    socket.on('client message', (data)=>{
        io.emit('server message', data.message);
    });
});