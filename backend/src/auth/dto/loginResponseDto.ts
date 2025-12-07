// src/auth/dto/login-response.dto.ts
export class LoginResponseDto {
  message: string;
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
  };
}
