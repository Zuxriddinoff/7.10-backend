import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/enums';

export class CreateRegisterDto {
  @ApiProperty({ example: 'Zuxriddinov Lutfiddin', description: 'Foydalanuvchining to‘liq ismi' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'Zuxriddinov', description: 'Foydalanuvchi login nomi' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'romaaaa@gmail.com', description: 'Foydalanuvchi email manzili' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998913607434', description: 'Foydalanuvchi telefon raqami' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({ example: 'Abcd@1234', description: 'Kuchli parol (kamida 1 katta harf, 1 kichik harf, 1 raqam, 1 belgi)' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ example: Gender.Male, description: 'Foydalanuvchining jinsi' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
