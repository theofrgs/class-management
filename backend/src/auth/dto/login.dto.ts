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
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/, { message: 'Passwords must contain at least 1 upper case letter, 1 lower case letter 1 number, 1 special character and at least 8 characters ' })
    password: string;
}