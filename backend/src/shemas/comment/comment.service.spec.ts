import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentShemaService } from './comment.shema.service';
import { Comment } from './comment.shema';

describe('CommentService', () => {
    let service: CommentShemaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentShemaService,
                {
                    provide: getModelToken(Comment.name),
                    useValue: Model  // <-- Use the Model Class from Mongoose
                },
            ],
        }).compile();

        service = module.get<CommentShemaService>(CommentShemaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
