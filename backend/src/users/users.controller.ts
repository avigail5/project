import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post()
  register(@Body() dto: RegisterUserDto) {
    return this.usersService.createUser(dto);
}

}
