import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddTodoInput {
  @Field()
  text!: string;
}
