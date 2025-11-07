import { Test } from '@nestjs/testing';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '@src/app.module';
import { gql } from '@test-utils/gql';
import type { GraphQLResponse } from '@test-utils/gql';

type Todo = { id: string; text: string; done: boolean };

describe('GraphQL E2E (Fastify)', () => {
  let app: NestFastifyApplication;
  let todoId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('adds a new todo', async () => {
    const mutation = `
      mutation AddTodo($text: String!) {
        addTodo(input: { text: $text }) {
          id
          text
          done
        }
      }
    `;

    const res = await gql<{ addTodo: Todo }>(app.getHttpServer(), mutation, {
      text: 'Learn Nest GraphQL',
    });

    const body = res.body as GraphQLResponse<{ addTodo: Todo }>;

    expect(body.errors).toBeUndefined();
    expect(body.data?.addTodo).toEqual(
      expect.objectContaining({
        text: 'Learn Nest GraphQL',
        done: false,
      }),
    );

    todoId = body.data!.addTodo.id;
  });

  it('queries todo by id', async () => {
    const query = `
      query GetTodoById($id: ID!) {
        todo(id:$id){ id, text, done }
      }
    `;

    const res = await gql<{ todo: Todo }>(app.getHttpServer(), query, {
      id: todoId,
    });

    expect(res.status).toBe(200);

    const body = res.body as GraphQLResponse<{ todo: Todo }>;

    expect(body.errors).toBeUndefined();
    expect(body.data?.todo).toEqual({
      id: todoId,
      text: 'Learn Nest GraphQL',
      done: false,
    });
  });

  it('queries list of todos', async () => {
    const query = `
      query GetAllTodos {
        todos { id, text, done }
      }
    `;

    const res = await gql<{ todos: Todo[] }>(app.getHttpServer(), query);

    expect(res.status).toBe(200);

    const body = res.body as GraphQLResponse<{ todos: Todo[] }>;

    expect(body.errors).toBeUndefined();
    expect(body.data?.todos).toEqual([
      {
        id: todoId,
        text: 'Learn Nest GraphQL',
        done: false,
      },
    ]);
  });

  it('toggles todo status', async () => {
    const mutation = `
      mutation ToggleTodo($id: ID!) {
        toggleTodo(id: $id) {
          id
          text
          done
        }
      }
    `;

    const res = await gql<{ toggleTodo: Todo }>(app.getHttpServer(), mutation, {
      id: todoId,
    });

    expect(res.status).toBe(200);

    const body = res.body as GraphQLResponse<{ toggleTodo: Todo }>;
    expect(body.errors).toBeUndefined();
    expect(body.data?.toggleTodo).toEqual({
      id: todoId,
      text: 'Learn Nest GraphQL',
      done: true,
    });
  });

  it('deletes a todo', async () => {
    const mutation = `
      mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }
    `;

    const res = await gql<{ deleteTodo: boolean }>(
      app.getHttpServer(),
      mutation,
      {
        id: todoId,
      },
    );

    expect(res.status).toBe(200);

    const body = res.body as GraphQLResponse<{ deleteTodo: boolean }>;
    expect(body.errors).toBeUndefined();
    expect(body.data?.deleteTodo).toBe(true);
  });
});
