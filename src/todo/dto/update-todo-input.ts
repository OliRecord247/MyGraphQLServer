import { Field, ID, InputType } from '@nestjs/graphql';
import { Progress } from '../entities/progress.enum';

@InputType()
export class UpdateTodoInput {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) text?: string;
  @Field(() => Progress, { nullable: true }) progress?: Progress;
}
