import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartItem } from '../cart/cart.entity';
import { CreateOrderDto } from './dto/createOrderDto';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemsRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const user = await this.usersRepo.findOneBy({ id: dto.user_id });
    if (!user) throw new Error('User not found');

    let totalPrice = 0;
    const items: OrderItem[] = [];

    for (const item of dto.items) {
      const product = await this.productsRepo.findOneBy({ id: item.product_id });
      if (!product) throw new Error(`Product ${item.product_id} not found`);

      const orderItem = this.orderItemsRepo.create({
        product,
        quantity: item.quantity,
        price_each: product.price,
      });

      totalPrice += product.price * item.quantity;
      items.push(orderItem);
    }

    const order = this.ordersRepo.create({ user, total_price: totalPrice, items });
      await this.cartRepo.delete({ user: { id: dto.user_id } });
    return this.ordersRepo.save(order);
  }

  async getOrdersByUser(user_id: number) {
    return this.ordersRepo.find({
      where: { user: { id: user_id } },
      relations: ['items', 'items.product'],
      order: { id: 'DESC' },
    });
  }
  
 findAll(): Promise<Order[]> {
  return this.ordersRepo.find({
    relations: ['user'],
    select: {
      id: true,
      total_price: true,
      createdAt: true,
      status: true,
      user: {
        id: true,
      },
    },
  });
}


}
