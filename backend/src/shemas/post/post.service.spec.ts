import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostShemaService } from './post.shema.service';
import { Comment } from '../comment/comment.shema';
import { Post } from './post.shema';

describe('PostShemaService', () => {
    let service: PostShemaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostShemaService,
                {
                    provide: getModelToken(Comment.name),
                    useValue: Model  // <-- Use the Model Class from Mongoose
                },
                {
                    provide: getModelToken(Post.name),
                    useValue: Model  // <-- Use the Model Class from Mongoose
                },
            ],
        }).compile();

        service = module.get<PostShemaService>(PostShemaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
