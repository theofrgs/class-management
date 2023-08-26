import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
    let service: EncryptService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env',
                }),
            ],
            providers: [EncryptService, String],
        }).compile();

        service = module.get<EncryptService>(EncryptService);
    });

    it('Is defined', () => {
        expect(service).toBeDefined();
    });

    it('Is init', () => {
        expect(service.getKey()).toEqual(process.env.ENCRYPT_SECRET_KEY);
    });

    it('Basic - 01', () => {
        let toEncrypt = "hello world"
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 02', () => {
        let toEncrypt = ""
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 03', () => {
        let toEncrypt = null
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 04', () => {
        let toEncrypt = "       "
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 05', () => {
        let toEncrypt = "   adadaed"
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 05', () => {
        let toEncrypt = "1234567"
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });

    it('Basic - 06', () => {
        let toEncrypt = "!eJZqXFwXwn2St"
        expect(service.decrypt(service.encrypt(toEncrypt))).toEqual(toEncrypt);
    });
});
