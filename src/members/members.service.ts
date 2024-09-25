import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from 'src/database/database.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class MembersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getMembers() {
    return this.db.query.members.findMany();
  }
}
