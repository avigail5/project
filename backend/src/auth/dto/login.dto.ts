import { IsString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsOptional()  // משתמש יכול להזדהות עם username או email
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()  // לא חובה אם מתחברים דרך Gmail
  password?: string;
}
