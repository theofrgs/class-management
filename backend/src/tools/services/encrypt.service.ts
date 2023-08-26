import { Injectable } from '@nestjs/common';
import { enc, Rabbit } from 'crypto-js';

@Injectable()
export class EncryptService {
    private key: string = process.env.ENCRYPT_SECRET_KEY

    constructor(key?: string) {
        this.key = key == '' ? this.key : key;
    }

    getKey(): string {
        return this.key
    }

    encrypt(toEncrypt: string): string {
        return toEncrypt == null ? null : Rabbit.encrypt(toEncrypt, this.key).toString();
    }

    decrypt(encryptedString: string): string {
        return encryptedString == null ? null : Rabbit.decrypt(encryptedString, process.env.ENCRYPT_SECRET_KEY).toString(enc.Utf8);
    }
}