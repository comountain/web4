const net = require('net');
const Mypack = require('./pack');
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8080
});

const arr = ['1','2','3','4']
    

setTimeout(function() {
    for (let i=0; i<arr.length; i++) {
        client.write(Mypack(arr[i]));
    }
}, 1000);
