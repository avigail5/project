import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
constructor(
@InjectRepository(CartItem)
private cartRepo: Repository<CartItem>,

@InjectRepository(User)
private userRepo: Repository<User>,

@InjectRepository(Product)
private productRepo: Repository<Product>,


) {}

async addToCart(userId: number, dto: AddToCartDto) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  const product = await this.productRepo.findOne({ where: { id: dto.productId } });
  if (!product) throw new NotFoundException('Product not found');

  const existing = await this.cartRepo.findOne({
    where: { user: { id: userId }, product: { id: dto.productId } },
  });

  if (existing) {
    existing.quantity += dto.quantity;
    return this.cartRepo.save(existing);
  }

  const item = this.cartRepo.create({
    user,
    product,
    quantity: dto.quantity,
  });

  return this.cartRepo.save(item);
}

async getCart(userId: number) {
  return this.cartRepo.find({
    where: { user: { id: userId } },
    relations: ['product'], // כדי לקבל את המידע על המוצר
  });
}


async updateCartItem(id: number, dto: UpdateCartItemDto) {
await this.cartRepo.update(id, { quantity: dto.quantity });
return this.cartRepo.findOne({ where: { id } });
}

async removeCartItem(id: number) {
return this.cartRepo.delete(id);
}
}
