import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Get('user/:user_id')
  async getOrdersByUser(@Param('user_id') user_id: number) {
    return this.ordersService.getOrdersByUser(user_id);
  }
}