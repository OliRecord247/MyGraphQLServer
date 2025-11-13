import { Migration } from '@mikro-orm/migrations';

export class Migration20251113233917 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "todo" ("id" bigserial primary key, "text" varchar(255) not null, "progress" text check ("progress" in ('NOT_STARTED', 'IN_PROGRESS', 'DONE')) not null);`);
  }

}
