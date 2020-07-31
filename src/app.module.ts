import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
