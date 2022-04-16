var version = 0;

var pack = function(data){
    var Data = Buffer.from(data,'utf-8');
    var buffer = Buffer.allocUnsafe(9);
    const length = Data.byteLength;
    buffer[0] = 0x1;
    buffer.writeUIntBE(length,1,4);
    buffer.writeUIntBE(version++,5,4);
    var retpack = Buffer.concat([buffer,Data]);
    return retpack;
}

module.exports = pack;
