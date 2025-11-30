import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Post('add/:userId')
  addToCart(@Param('userId') userId: number, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(userId, dto);
  }

  @Patch('item/:id')
  updateItem(@Param('id') id: number, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(id, dto);
  }

  @Delete('item/:id')
  removeItem(@Param('id') id: number) {
    return this.cartService.removeCartItem(id);
  }
}
