import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
  ) {}

  async addToCart(userId: number, dto: AddToCartDto) {
    const existing = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: dto.productId } },
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartRepo.save(existing);
    }

    const item = this.cartRepo.create({
      user: { id: userId },
      product: { id: dto.productId },
      quantity: dto.quantity,
    });

    return this.cartRepo.save(item);
  }

  async getCart(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
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
