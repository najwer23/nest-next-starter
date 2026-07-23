import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DatabaseGQL {
  @Field(() => ID) id!: string;
  @Field(() => String) name!: string;
  @Field(() => String, { nullable: true }) reviewedAt: string | null = null;
  @Field(() => String, { nullable: true }) reviewedBy: string | null = null;
}

@InputType()
export class MarkReviewedInput {
  @Field(() => String) rowId!: string;
}
