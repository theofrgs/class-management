import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

import { Comment } from '../comment/comment.shema';


export type PostDocument = Post & Document;

@Schema()
export class Post {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Date, default: Date.now})
    date: Date;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    imagePath: string;

    @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comment: Comment[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);