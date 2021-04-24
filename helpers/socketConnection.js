module.exports = (io)=>{
    io.on('connection', (socket)=>{
        socket.on('client message', (data)=>{
            //console.log(data);
            io.emit('server message', data.message);
        });
    });
}