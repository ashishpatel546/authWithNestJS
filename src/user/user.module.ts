import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/userEntity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
