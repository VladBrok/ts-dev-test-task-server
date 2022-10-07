import { IsEmail } from 'class-validator';
import { IsPassword } from 'src/lib/validation/is-password';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
