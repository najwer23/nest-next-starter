import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseGQLModule } from './databaseGQL/databaseGQL.module';
import { HealthModule } from './health/health.module';
import { DatabaseRestModule } from './database-rest/database-rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      sortSchema: true,
    }),
    HealthModule,
    DatabaseGQLModule,
    DatabaseRestModule,
  ],
  providers: [],
})
export class AppModule {}
