import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Conf } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //swagger option
  const options = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apis', app, document);
  
  await app.listen(Conf.serverPort);
}
bootstrap();
