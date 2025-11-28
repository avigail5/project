import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto;

    // חיפוש משתמש ב-DB
    const user = await this.usersService.findByUsername(username);
    if (!user) return null; // משתמש לא קיים

    //  השוואת סיסמה
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return null; // סיסמה לא נכונה

    //  מחזירים את המשתמש (ללא הסיסמה)
    const { passwordHash, ...result } = user;
    return result;

    }
}
