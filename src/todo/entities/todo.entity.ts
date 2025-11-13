import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Progress } from './progress.enum';

@ObjectType()
export class Todo {
  @Field(() => ID) id!: string;
  @Field() text!: string;
  @Field(() => Progress) progress!: Progress;
}
