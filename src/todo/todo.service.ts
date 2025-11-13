import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EntityManager } from '@mikro-orm/core'; // v6
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Progress } from './entities/progress.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todos: EntityRepository<Todo>,
    private readonly em: EntityManager,
  ) {}

  findAll(): Promise<Todo[]> {
    console.log(this.todos);
    return this.todos.findAll();
  }

  async findOne(id: number): Promise<Todo | undefined> {
    const todo = await this.todos.findOne({ id });
    return todo ?? undefined;
  }

  async add(
    text: string,
    progress: Progress = Progress.NOT_STARTED,
  ): Promise<Todo> {
    const todo = this.todos.create({ text, progress });
    await this.em.persistAndFlush(todo);
    return todo;
  }

  async update(
    id: number,
    patch: Partial<Pick<Todo, 'text' | 'progress'>>,
  ): Promise<Todo> {
    const todo = await this.todos.findOneOrFail({ id });
    if (patch.text !== undefined) todo.text = patch.text;
    if (patch.progress !== undefined) todo.progress = patch.progress;
    await this.em.flush();
    return todo;
  }

  async delete(id: number): Promise<boolean> {
    const todo = await this.todos.findOne({ id });
    if (!todo) return false;
    await this.em.removeAndFlush(todo);
    return true;
  }
}
