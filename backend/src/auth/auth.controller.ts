// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return { message: "Redirecting to Google..." };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleRedirect(@Req() req, @Res() res) {
    const user = req.user.user;
    const token = req.user.access_token;
    const userParam = encodeURIComponent(JSON.stringify({ ...user, token }));
  
    res.redirect(`http://localhost:5173/products?user=${userParam}`);
}
}