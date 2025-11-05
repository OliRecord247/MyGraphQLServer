import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;

  @Field()
  done!: boolean;
}
