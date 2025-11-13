import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Progress } from './progress.enum';

@ObjectType()
@Entity()
export class Todo {
  @Field(() => ID)
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Field()
  @Property()
  text!: string;

  @Field(() => Progress)
  @Enum(() => Progress)
  progress!: Progress;
}
