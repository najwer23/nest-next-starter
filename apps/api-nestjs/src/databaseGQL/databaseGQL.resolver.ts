import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseGQL, MarkReviewedInput } from './databaseGQL.model';
import { DatabaseGQLService } from './databaseGQL.service';

@Resolver(() => DatabaseGQL)
export class DatabaseGQLResolver {
  constructor(private readonly companiesGQLService: DatabaseGQLService) {}

  @Query(() => [DatabaseGQL])
  databaseGQL() {
    return this.companiesGQLService.findAll();
  }

  @Mutation(() => DatabaseGQL)
  markRowReviewed(@Args('input') input: MarkReviewedInput) {
    return this.companiesGQLService.markReviewed(input.rowId);
  }
}

/*
  query {
    databaseGQL {
      id
      name
      reviewedAt
      reviewedBy
    }
  }

  curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { databaseGQL { id name reviewedAt reviewedBy } }"}'

  //////////////////////////////////

  mutation {
    markRowReviewed(input: { rowId: "1" }) {
      id
      reviewedAt
      reviewedBy
    }
  }

  curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation($input: MarkReviewedInput!) { markRowReviewed(input: $input) { id reviewedAt reviewedBy } }", "variables": {"input": {"rowId": "1"}}}'
*/
