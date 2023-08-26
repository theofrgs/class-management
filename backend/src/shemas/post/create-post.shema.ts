import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { Model, Types, SchemaTypes } from 'mongoose';

class CreatePostShema {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    imagePath: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string;

    constructor(title: string, description: string, author: string, imagePath: string) {
        this.title = title
        this.description = description
        this.author = author
        this.imagePath = imagePath
    }
}

export {
    CreatePostShema,
}