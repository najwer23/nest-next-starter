import { Module } from '@nestjs/common';
import { DatabaseGQLResolver } from './databaseGQL.resolver';
import { DatabaseGQLService } from './databaseGQL.service';

@Module({ providers: [DatabaseGQLResolver, DatabaseGQLService] })
export class DatabaseGQLModule {}
