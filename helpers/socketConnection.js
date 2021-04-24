require('./removeByValue')();

module.exports = (io)=>{
    let userList = []; //채팅에 접속한 사용자 리스트
    io.on('connection', (socket)=>{
        //chat user id나오게 설정
        //passport의 req.user의 데이터에 접근하기
        const session = socket.request.session.passport;
        const user = (typeof session !== 'undefined')?(session.user) :"";

        // UserList에 사용자명이 존재하지 않으면 삽입
        if(!userList.includes(user.displayname)){
            userList.push(user.displayname);
        }
        io.emit('join', userList);

        //사용자 명과 메시지를 반환한다.
        socket.on('client message', (data)=>{
            //console.log(data);
            io.emit('server message', {message: data.message, displayname:user.displayname});
        });

        socket.on('disconnect', ()=>{
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        })
    });
}