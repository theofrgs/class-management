import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user/user.shema';
import { UserService } from 'src/shemas/user/user.service';
import { EncryptService } from 'src/tools/services/encrypt.service';
import { HashService } from 'src/tools/services/hash.service';
import { JwtService } from 'src/tools/services/jwt.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    schema.plugin(require('mongoose-autopopulate'));
                    return schema;
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [
        HashService,
        String,
        EncryptService,
        JwtService,
        AuthService,
        UserService,
    ]
})
export class AuthModule { }
