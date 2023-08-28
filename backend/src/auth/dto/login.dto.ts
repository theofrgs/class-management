import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}