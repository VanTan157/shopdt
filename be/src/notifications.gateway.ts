import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000", // URL của frontend NextJS
    methods: ["GET", "POST", "PUT", "HEAD", "PATCH", "DELETE"],
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // Map userId -> socketId

  handleConnection(client: Socket) {
    console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  }

  @SubscribeMessage("register")
  handleRegister(client: Socket, userId: string) {
    this.connectedUsers.set(userId, client.id);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  // Hàm gửi thông báo đến người dùng
  sendOrderConfirmation(userId: string, orderId: string) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit("orderConfirmed", {
        orderId,
        message: "Đơn hàng của bạn đã được xác nhận!",
        timestamp: new Date().toISOString(),
      });
      console.log(`Notification sent to user ${userId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  }
}
