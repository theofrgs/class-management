import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './apps/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Theo class-management API')
        .setDescription('API for class-management')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);

    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
