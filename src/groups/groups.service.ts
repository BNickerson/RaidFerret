import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from 'src/database/database.schema';

@Injectable()
export class GroupsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  public async getGroupsByGuildId() {
    return this.db.query.group.findMany();
  }

  public async getGroupsByGuildIdAndBlueprintId(
    guildId: string,
    blueprintId: number,
  ) {
    return this.db.query.group.findMany({
      where: (groups, { and, eq }) =>
        and(
          eq(groups.guildId, guildId),
          eq(groups.groupBlueprintId, blueprintId),
        ),
    });
  }

  public async getGroupById(id: number) {
    return this.db.query.group.findFirst({
      where: (groups, { eq }) => eq(groups.id, id),
    });
  }
}
