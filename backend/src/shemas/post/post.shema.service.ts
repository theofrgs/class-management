import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from './post.shema';
import { Comment, CommentDocument } from '../comment/comment.shema';
import { CreatePostShema } from './create-post.shema';
import { SchemaTypes, Types, Model } from 'mongoose';

@Injectable()
export class PostShemaService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Post.name) private commentModel: Model<CommentDocument>,
    ) { }

    async create(createPostShema: CreatePostShema): Promise<Post> {
        const newPost = new this.postModel({
            ...createPostShema,
            user_id: createPostShema.author
        });
        newPost.save()
        return newPost;
    }

    // async findAndModify(id: string, createPostShema: CreatePostShema): Promise<Post> {
    //     const posts = await this.postModel.find({ _id: new Types.ObjectId(id) }).exec();

    //     if (posts.length !== 1) {
    //         return null
    //     }
    //     console.log(posts[0])
    //     posts[0].save()
    //     return posts[0]
    // }

    async addComment(id: string, newComment: Comment): Promise<Post> {
        const post = await this.postModel.findById(id).exec();

        if (!post)
            return null;
        post.comment.push(newComment)
        await post.save();
        return (await post.populate({ path: 'user_id', select: ["pseudo"] })).populate({ path: 'comment', populate: { path: 'user_id', select: ["pseudo"] } });
    }

    async deleteComment(id: string, userId: string, commentId: string): Promise<Post> {
        const post = await this.postModel.findById(id).populate({ path: 'user_id', select: ["pseudo"] }).populate({ path: 'comment', populate: { path: 'user_id', select: ["pseudo"] } }).exec();
        var index = -1;

        if (!post)
            return null;
        index = post.comment.findIndex(comment => { return comment._id.toString() === commentId })
        if (index == -1)
            return null;
        post.comment.splice(index, 1);
        post.save()
        return post;
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().sort({ date: -1 }).populate({ path: 'user_id', select: ['pseudo'] }).exec();
    }

    async findByTitle(title: string): Promise<Post[]> {
        var regexp = new RegExp("^" + title, 'i');

        return this.postModel.find({ title: regexp }).sort({ date: -1 }).populate({ path: 'comment', model: 'Comment' }).exec();
    }

    async findByAuthorId(author: string): Promise<Post[]> {
        return this.postModel.find({ user_id: new Types.ObjectId(author) }).sort({ date: -1 }).populate({ path: 'user_id', model: 'User' }).exec();
    }

    async findByAuthorName(author: string): Promise<Post[]> {
        var regexp = new RegExp("^" + author);

        return this.postModel.find({ name: regexp }).sort({ date: -1 }).populate({ path: 'user_id', model: 'User' }).exec();
    }

    async findById(id: string): Promise<any> {
        return this.postModel.findById(id).sort({ date: -1 }).populate({ path: 'user_id', select: ["pseudo"] }).populate({ path: 'comment', populate: { path: 'user_id', select: ["pseudo"] } }).exec();
    }
}