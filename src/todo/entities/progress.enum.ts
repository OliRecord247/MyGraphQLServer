import { registerEnumType } from '@nestjs/graphql';

export enum Progress {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

registerEnumType(Progress, {
  name: 'Progress',
});
