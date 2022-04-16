const BEGIN = 0x1;
const DLEN = 4;
const VERSION = 4;

const start = 1;
const head = 2;
const jdata = 3;
const end = 4;
const quit = 5;

class Mypro{
    constructor(){
        this.cursta = start;
        this.buffer = null;
        this.pos = 0;
        this.data = null;
        this.datalen = 0;
    }
    changeandcheck(data){
        this.buffer = this.buffer? Buffer.concat([this.buffer,data]): data;
        if(this.buffer.byteLength < 1 + DLEN + VERSION || this.buffer == null)
        {
            return null;
        }
        while(this.cursta != quit){
            switch(this.cursta){
                case start:
                    if(this.buffer[0] == BEGIN){
                        this.pos ++;
                        this.cursta = head;
                    }
                    else{
                        return null;
                    }
                case head:
                    this.datalen = this.buffer.readUIntBE(this.pos, DLEN);
                    this.buffer.readUIntBE(this.pos + DLEN,VERSION);
                    this.pos += DLEN + VERSION;
                    this.cursta = jdata;
                case jdata:
                    if(this.buffer.byteLength < this.datalen + 1 + DLEN + VERSION)
                    {
                        return;
                    }
                    this.data = Buffer.alloc(this.datalen);
                    this.buffer.copy(this.data,0,this.pos,this.pos+this.datalen);
                    this.pos += this.datalen;
                    this.cursta = end;
                case end:
                    this.buffer = this.buffer.slice(this.pos);
                    this.pos = 0;
                    this.datalen = 0;
                    this.cursta = quit;
                    break;
                default:
                    return null;
            }
        }
        this.cursta = start
        var da = this.data;
        this.data = null;
        return da;
    }
}

module.exports = Mypro;
