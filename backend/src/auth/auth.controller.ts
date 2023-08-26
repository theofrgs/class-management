import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("/login/native")
    async login(@Body(new ValidationPipe()) body: LoginDto, @Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.ACCEPTED).send(await this.authService.loginNative(body))
    }

    @Post("/register/native")
    async register(@Body(new ValidationPipe()) body: RegisterDTO, @Res({ passthrough: true }) res: Response) {
        res.send(await this.authService.registerNative(body))
    }
}
