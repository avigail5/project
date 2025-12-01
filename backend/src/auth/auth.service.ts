// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register new user
  async register(dto: RegisterDto) {
    // בדיקה אם שם המשתמש קיים
    const userExists = await this.usersService.findByUsername(dto.username);
    if (userExists) throw new UnauthorizedException('Username already exists');

    // Hashing של הסיסמה
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // יצירת המשתמש
    const newUser = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return { message: 'User registered successfully', newUser };
  }

  // Login user
  async login(dto: LoginDto) {

  if (!dto.email) {
    throw new UnauthorizedException('Email is required');
  }

  const user = await this.usersService.findByEmail(dto.email);
  if (!user) throw new UnauthorizedException('Invalid credentials');

  if (!dto.password) {
    throw new UnauthorizedException('Password is required');
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, email: user.email };
  const token = this.jwtService.sign(payload);

  return {
    message: 'Logged in successfully',
    access_token: token,
  };
}
}