import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostShema } from './create-post.shema';

describe('CreatePostShema', () => {
    let Shema: CreatePostShema;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreatePostShema],
        }).compile();

        Shema = module.get<CreatePostShema>(CreatePostShema);
    });

    it('Is defined', () => {
        expect(Shema).toBeDefined();
    });
});
