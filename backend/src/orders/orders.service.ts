// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from './order.entity';
// import { OrderItem } from './order-item.entity';
// import { CartItem } from '../cart/cart.entity';

// @Injectable()
// export class OrdersService {
//   constructor(
//     @InjectRepository(Order)
//     private orderRepo: Repository<Order>,
//     @InjectRepository(OrderItem)
//     private orderItemRepo: Repository<OrderItem>,
//     @InjectRepository(CartItem)
//     private cartRepo: Repository<CartItem>,
//   ) {}

//   async createOrder(user_id: number) {
//     // 1. Get cart
//     const cart = await this.cartRepo.find({
//       where: { user_id },
//       relations: ['product'],
//     });

//     if (!cart.length) throw new NotFoundException('Cart is empty');

//     // 2. Calculate total
//     const total = cart.reduce(
//       (acc, item) => acc + Number(item.product.price) * item.quantity,
//       0,
//     );

//     // 3. Create order
//     const order = await this.orderRepo.save({
//       user_id,
//       total_price: total,
//     });

//     // 4. Create order items
//     const orderItems = cart.map((c) =>
//       this.orderItemRepo.create({
//         order_id: order.id,
//         product_id: c.product_id,
//         quantity: c.quantity,
//         price_each: c.product.price,
//       }),
//     );

//     await this.orderItemRepo.save(orderItems);

//     // 5. Empty cart
//     await this.cartRepo.delete({ user_id });

//     return order;
//   }

//   getUserOrders(user_id: number) {
//     return this.orderRepo.find({
//       where: { user_id },
//       relations: ['items', 'items.product'],
//     });
//   }

//   getOrderById(id: number) {
//     return this.orderRepo.findOne({
//       where: { id },
//       relations: ['items', 'items.product'],
//     });
//   }
// }