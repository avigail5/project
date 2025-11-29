// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

    // בדיקה אם האימייל קיים
    const emailExists = await this.usersService.findByEmail(dto.email);
    if (emailExists) throw new UnauthorizedException('Email already exists');

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
    // בחירת משתמש לפי username או email
    let user;
    if (dto.username) {
      user = await this.usersService.findByUsername(dto.username);
    } else if (dto.email) {
      user = await this.usersService.findByEmail(dto.email);
    } else {
      throw new UnauthorizedException('Username or email required');
    }

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // בדיקה שה־password נשלח
    if (!dto.password) {
      throw new UnauthorizedException('Password is required');
    }

    // בדיקת סיסמה
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // יצירת JWT
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged in successfully',
      access_token: token,
    };
  }
}
