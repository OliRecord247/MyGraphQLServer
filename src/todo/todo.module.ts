import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Todo } from './entities/todo.entity';

import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
