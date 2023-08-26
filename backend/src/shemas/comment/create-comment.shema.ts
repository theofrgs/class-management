import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { Model, Types, SchemaTypes } from 'mongoose';

class CreateCommentShema {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postId: string;

    constructor(content: string, postId: string) {
        this.content = content
        this.postId = postId
    }
}

export {
    CreateCommentShema,
}