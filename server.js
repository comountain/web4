const net = require('net');
const Mypro = require('./mypro');

const server = net.createServer((socket) => {
  const mypro = new Mypro() 
  socket.on('data',(data) => {
    console.log('从客户端接收到数据：')
    var da = mypro.parse(data);
    if(da != null)
        console.log(da.toString('utf8'));
    else
        console.log('数据错误');
  });
});

server.listen(8080);
