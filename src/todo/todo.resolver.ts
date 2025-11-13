import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { AddTodoInput } from './dto/add-todo.input';
import { UpdateTodoInput } from './dto/update-todo-input';
import { TodoService } from './todo.service';

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
    return this.service.add(input.text, input.progress);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('input') input: UpdateTodoInput) {
    return this.service.update(input.id, {
      text: input.text,
      progress: input.progress,
    });
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
