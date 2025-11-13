import { Field, InputType } from '@nestjs/graphql';
import { Progress } from '../entities/progress.enum';

@InputType()
export class AddTodoInput {
  @Field() text!: string;
  @Field(() => Progress, { defaultValue: Progress.NOT_STARTED })
  progress!: Progress;
}
