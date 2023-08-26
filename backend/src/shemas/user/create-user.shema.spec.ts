import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './create-user.shema';

describe('CreateUserDto', () => {
    let dto: CreateUserDto;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateUserDto],
        }).compile();

        dto = module.get<CreateUserDto>(CreateUserDto);
    });

    it('Is defined', () => {
        expect(dto).toBeDefined();
    });
});
