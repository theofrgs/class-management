import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Comment, CommentDocument } from './comment.shema';
import { CreateCommentShema } from './create-comment.shema';
import { SchemaTypes, Types, Model } from 'mongoose';

@Injectable()
export class CommentShemaService {
    constructor(
        @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
    ) { }

    async create(createCommentShema: CreateCommentShema, author: string): Promise<Comment> {
        const newComment = new this.CommentModel({
            ...createCommentShema,
            post_id: createCommentShema.postId,
            user_id: author
        });
        newComment.save()
        return newComment;
    }

    async findAll(): Promise<Comment[]> {
        return this.CommentModel.find().exec();
    }

    async findByPost(postId: string): Promise<any> {
        return this.CommentModel.find({ post_id: postId }).exec();
    }

    async deleteById(id: string): Promise<Comment[]> {
        return this.CommentModel.findByIdAndDelete(id);
    }

    async findByAuthor(author: string): Promise<Comment[]> {
        return this.CommentModel.find({ author: new Types.ObjectId(author) }).exec();
    }

    async findById(id: string): Promise<Comment[]> {
        return this.CommentModel.find({ _id: new Types.ObjectId(id) }).populate({ path: 'user_id', select: ["pseudo"] }).exec();
    }
}