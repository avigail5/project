import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from '../cart/cart.entity';
import { Order } from '../orders/order.entity';

@Entity({ schema: 'htl', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string; // hashed password

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ default: false })
  is_admin: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
