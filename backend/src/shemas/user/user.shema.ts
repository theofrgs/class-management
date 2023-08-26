import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true , unique: true})
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Date, default: new Date()})
    date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);