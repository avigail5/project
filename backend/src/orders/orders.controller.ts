// import { Controller, Post, Param, Get } from '@nestjs/common';
// import { OrdersService } from './orders.service';

// @Controller('orders')
// export class OrdersController {
//   constructor(private ordersService: OrdersService) {}

//   @Post(':userId')
//   createOrder(@Param('userId') userId: number) {
//     return this.ordersService.createOrder(userId);
//   }

//   @Get('user/:userId')
//   getOrdersByUser(@Param('userId') userId: number) {
//     return this.ordersService.getUserOrders(userId);
//   }

//   @Get(':id')
//   getOrder(@Param('id') id: number) {
//     return this.ordersService.getOrderById(id);
//   }
// }
