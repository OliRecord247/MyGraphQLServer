import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: '1', text: 'Learn Nest GraphQL', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }
  findOne(id: string): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }
  add(text: string): Todo {
    const t: Todo = { id: String(Date.now()), text, done: false };
    this.todos.push(t);
    return t;
  }
  toggle(id: string): Todo {
    const t = this.findOne(id);
    if (!t) throw new Error('Not found');
    t.done = !t.done;
    return t;
  }
  delete(id: string): boolean {
    const i = this.todos.findIndex((t) => t.id === id);
    if (i === -1) return false;
    this.todos.splice(i, 1);
    return true;
  }
}
