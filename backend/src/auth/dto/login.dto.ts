import { IsString, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
