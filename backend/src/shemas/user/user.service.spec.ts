import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './user.shema';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: Model  // <-- Use the Model Class from Mongoose
                },],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('Is defined', () => {
        expect(service).toBeDefined();
    });
});
