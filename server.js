const app = require('./app.js');
const port = 3000;

const server = app.listen( port, function(){
    console.log('Express listening on port', port);
});

//server side socket io
const listen = require('socket.io');
const io = listen(server);
require('./helpers/socketConnection')(io);
//const socketConnection = require('./helpers/socketConnection');
//socketConnection(io);
