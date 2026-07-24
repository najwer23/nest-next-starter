import { Module } from '@nestjs/common';
import { DatabaseRestController } from './database-rest.controller';
import { DatabaseRestService } from './database-rest.service';

@Module({
  controllers: [DatabaseRestController],
  providers: [DatabaseRestService],
})
export class DatabaseRestModule {}
