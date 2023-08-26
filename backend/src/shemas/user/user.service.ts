import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { User, UserDocument } from './user.shema';
import { CreateUserDto } from './create-user.shema';
import { SchemaTypes, Types, Document } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        newUser.save()
        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User[]> {
        return this.userModel.find({ email: email }).exec();
    }

    async findById(id: string): Promise<User[]> {
        return this.userModel.find({ _id: id }).exec();
    }
}