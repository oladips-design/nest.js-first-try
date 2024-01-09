import { Module } from '@nestjs/common';
import { dbProvider } from './database';

@Module({
  providers: [...dbProvider],
  exports: [...dbProvider],
})
export class DatabaseModule {}
