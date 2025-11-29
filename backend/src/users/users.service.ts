import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

 createUser(dto: RegisterUserDto) {
  const user = this.usersRepository.create(dto);
  return this.usersRepository.save(user);
}

}
