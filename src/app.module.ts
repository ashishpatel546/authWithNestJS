import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/userEntity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env' ,
  }),
  TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME, 
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        entities:[User],
        synchronize: true
      }),
  AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
