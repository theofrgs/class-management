import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
    let service: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env',
                }),
            ],
            providers: [JwtService, String],
        }).compile();

        service = module.get<JwtService>(JwtService);
    });

    it('Is defined', () => {
        expect(service).toBeDefined();
    });

    it('Is init', () => {
        expect(service.getPrivateKey()).toEqual(process.env.JWT_SECRET_KEY);
    });
});
