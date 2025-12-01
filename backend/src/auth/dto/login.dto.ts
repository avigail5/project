import { IsString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()  // לא חובה אם מתחברים דרך Gmail
  password?: string;
}
