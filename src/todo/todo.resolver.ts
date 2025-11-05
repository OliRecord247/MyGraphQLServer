import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { AddTodoInput } from './dto/add-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly service: TodoService) {}

  @Query(() => [Todo])
  todos(): Todo[] {
    return this.service.findAll();
  }

  @Query(() => Todo, { nullable: true })
  todo(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Todo)
  addTodo(@Args('input') input: AddTodoInput) {
    return this.service.add(input.text);
  }

  @Mutation(() => Todo)
  toggleTodo(@Args('id', { type: () => ID }) id: string) {
    return this.service.toggle(id);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
