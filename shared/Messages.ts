//dont reuse IDs
export const testingBasicMessageID = 50;
export class testingBasicMessage {
    //all vars here
    message: string = "";

    //constructor, self explanatory
    constructor(message: string) {
        this.message = message;
    }

    //parsing the packet
    read(read: TSPacketRead): void {
        this.message = read.ReadString();
    }
    //writing the packet
    write(): TSPacketWrite {
        //you can default the size to 0, it will find it's own size. sometimes string brick this. i default to 2000 whenever it acts up
        let packet = CreateCustomPacket(testingBasicMessageID, 0);
        packet.WriteString(this.message);
        return packet;
    }
}

//you need to have size to know how much data is in there, similar to how m2 store their information in ABlocks
export const testingArrayMessageID = 51;
export class testingArrayMessage {
    size: uint32 = 0;
    info: number[] = [];
    constructor(size: uint32, info: number[]) {
        this.size = size;
        this.info = info;
    }
    read(read: TSPacketRead): void {
        this.info.pop();
        this.size = read.ReadUInt32();
        for (let i = 0; i < this.size; i++) {
            let data = read.ReadDouble();
            this.info.push(data);
        }
    }
    write(): TSPacketWrite {
        let packet = CreateCustomPacket(testingArrayMessageID, 0);
        packet.WriteUInt32(this.size);
        for (let i = 0; i < this.size; i++) {
            packet.WriteDouble(this.info[i]);
        }
        return packet;
    }
}