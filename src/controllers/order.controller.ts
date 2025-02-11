import { OrderService } from "../services/order.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    try {
      const result = await this.orderService.po(orderData);
      if (!result) {
        return { success: false };
      }
      return { success: true, order: result };
    } catch (e) {
      return { success: false };
    }
  }
}
