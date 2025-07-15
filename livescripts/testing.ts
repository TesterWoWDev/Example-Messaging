import { testingArrayMessage, testingBasicMessage, testingBasicMessageID } from "../shared/Messages";

export function testing(events:TSEvents)
{
    events.Player.OnCommand((player,command,found)=>{
        console.log(command.get())
        if(command.get().startsWith('a')){
            found.set(true)
            console.log('first')
            let pkt = new testingBasicMessage("Hello World");
            pkt.write().SendToPlayer(player)
        }else if(command.get().startsWith('b')){
            found.set(true)
            console.log('second')
            let pkt = new testingArrayMessage(1,[1]);
            for(let i=0;i<Math.floor(Math.random()*10);i++){
                pkt.info.push(Math.random());
            }
            pkt.size = pkt.info.length;
            pkt.write().SendToPlayer(player)
        }
    })
    events.CustomPacket.OnReceive(testingBasicMessageID,(opcode,packet,player)=>{
        console.log('recieved basic')
        let customPacket = new testingBasicMessage("");
        customPacket.read(packet);
        console.log(customPacket.message);
    })
}