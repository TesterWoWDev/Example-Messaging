import { testingArrayMessage, testingArrayMessageID, testingBasicMessage, testingBasicMessageID } from "../shared/Messages";

export function testing()
{
    //recieve packet
    OnCustomPacket(testingBasicMessageID,pkt=>{
        //parse packet
        let customPacket = new testingBasicMessage("");//info here gets replaced, you could use a empty constructor in Messages.ts that uses default values instead of this
        customPacket.read(pkt);
        //use packet info
        console.log(customPacket.message);
        //this is why i like having the constructor tho
        let sendpkt = new testingBasicMessage("Hello World");
        //could instead do this
        //sendpkt.message = "Hello World";
        //off to the server it goes
        sendpkt.write().Send();
    })

    //loop variant so you can see what an array does
    OnCustomPacket(testingArrayMessageID,pkt=>{
        let customPacket = new testingArrayMessage(1,[1]);
        customPacket.read(pkt);
        console.log('array Size:' + customPacket.size)
        for(let i = 0; i < customPacket.size; i++)
        {
            console.log('array Data:' + customPacket.info[i])
        }
    })
}