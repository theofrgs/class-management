import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import { AES, enc, HmacSHA1, Rabbit } from 'crypto-js';
import { sign, decode, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private privateKey: string = process.env.JWT_SECRET_KEY

    constructor(privateKey?: string) {
        this.privateKey = privateKey == '' ? this.privateKey : privateKey;
    }

    getPrivateKey(): string {
        return this.privateKey
    }

    create(payload: Object): string {
        return sign(payload, this.privateKey, { expiresIn: '100h' });;
    }

    getJwtContent(token: string) {
        try {
            var decoded = verify(token, this.privateKey);
            return {
                success: true,
                data: decoded
            }
        } catch (err) {
            return ({
                success: false,
                data: "Wrong jwt"
            })
        }
    }
}