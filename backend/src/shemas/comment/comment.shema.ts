import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Date, default: new Date()})
    date: Date;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: mongoose.Schema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);