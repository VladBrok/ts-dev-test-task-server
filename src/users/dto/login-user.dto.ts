import { IsEmail, IsNumber } from 'class-validator';
import { IsPassword } from 'src/lib/validation/is-password';

export class LoginUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
