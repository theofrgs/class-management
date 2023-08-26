import { Test, TestingModule } from '@nestjs/testing';
import { CreateCommentShema } from './create-comment.shema';

describe('CreateCommentShema', () => {
    let Shema: CreateCommentShema;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateCommentShema],
        }).compile();

        Shema = module.get<CreateCommentShema>(CreateCommentShema);
    });

    it('Is defined', () => {
        expect(Shema).toBeDefined();
    });
});
