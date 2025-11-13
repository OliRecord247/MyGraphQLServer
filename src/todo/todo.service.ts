import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Progress } from './entities/progress.enum';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  add(text: string, progress: Progress = Progress.NOT_STARTED): Todo {
    const t: Todo = { id: String(Date.now()), text, progress };
    this.todos.push(t);
    return t;
  }

  update(id: string, patch: Partial<Pick<Todo, 'text' | 'progress'>>): Todo {
    const t = this.todos.find((x) => x.id === id);
    if (!t) throw new Error('Not found');
    if (patch.text !== undefined) t.text = patch.text;
    if (patch.progress !== undefined) t.progress = patch.progress;
    return t;
  }

  delete(id: string): boolean {
    const i = this.todos.findIndex((t) => t.id === id);
    if (i === -1) return false;
    this.todos.splice(i, 1);
    return true;
  }
}
