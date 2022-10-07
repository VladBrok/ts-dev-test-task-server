import { Matches, MaxLength, IsEmail, IsOptional } from 'class-validator';
import { IsPassword } from '../../lib/validation/is-password';
import { NotMatches } from '../../lib/validation/not-matches';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsPassword()
  @IsOptional()
  password?: string;

  @MaxLength(30)
  @NotMatches(/[!@#$%^&*()+=-\[\]\\;,"'{}.<>:?|\/№]/)
  @IsOptional()
  name?: string;

  @Matches(/^[+7]\d{10}$/)
  @IsOptional()
  phoneNumber?: string;

  @MaxLength(120)
  @IsOptional()
  address?: string;

  @MaxLength(200)
  @IsOptional()
  info?: string;
}
