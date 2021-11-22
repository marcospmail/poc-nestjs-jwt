import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsEmail()
  email: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string
}

export default CreateUserDto