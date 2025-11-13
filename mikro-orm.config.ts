import { defineConfig } from '@mikro-orm/postgresql';
import { Todo } from './src/todo/entities/todo.entity';

export default defineConfig({
  entities: [Todo],
  dbName: 'todos',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  debug: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'migrations',
    glob: '!(*.d).{js,ts}',
  },
});
