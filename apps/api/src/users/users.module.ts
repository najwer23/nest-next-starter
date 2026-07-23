import { Module } from '@nestjs/common';
import { UserModule } from '../entities/user/user.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
