import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class EventsGateway {
    @SubscribeMessage("offer")
    handleOffer(client: any, payload: string): void {
        client.broadcast.emit("offer", payload);
    }

    @SubscribeMessage("answer")
    handleAnswer(client: any, payload: string): void {
        client.broadcast.emit("answer", payload);
    }

    @SubscribeMessage("candidate")
    handleCandidate(client: any, payload: string): void {
        client.broadcast.emit("candidate", payload);
    }

    @SubscribeMessage("start")
    handleStart(client: any, payload: string): void {
        client.broadcast.emit("start", payload);
    }

    @SubscribeMessage("end")
    handleEnd(client: any, payload: string): void {
        client.broadcast.emit("end", payload);
    }
}
