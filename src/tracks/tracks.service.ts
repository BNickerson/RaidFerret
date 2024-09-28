import { Inject, Injectable, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from 'src/database/database.schema';
import { trackMember } from 'src/database/database.schema';

const getLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 50));
};

@Injectable()
export class TracksService {
  private readonly logger = new Logger(TracksService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  public async getTracksByGuildId(guildId: string) {
    return this.db.query.track.findMany({
      where: (track, { eq }) => eq(track.guildId, guildId),
    });
  }

  public async addXpToTrackMember(
    trackId: number,
    memberId: string,
    xp: number,
  ) {
    const existingTrackMember = await this.db.query.trackMember.findFirst({
      where: (trackMembers, { and, eq }) =>
        and(
          eq(trackMembers.trackId, trackId),
          eq(trackMembers.memberId, memberId),
        ),
    });
    if (existingTrackMember) {
      const updatedXp = (existingTrackMember.trackXp += xp);
      const level = getLevel(existingTrackMember.trackXp);
      const updatedTrackMember = await this.db
        .update(trackMember)
        .set({
          trackXp: updatedXp,
          trackLevel: level,
        })
        .where(eq(schema.trackMember.id, existingTrackMember.id))
        .returning();

      this.logger.log(updatedTrackMember);
      return updatedTrackMember;
    }
    const level = getLevel(xp);
    const newTrackMember = await this.db
      .insert(trackMember)
      .values({
        trackId,
        memberId,
        trackXp: xp,
        trackLevel: level,
      })
      .returning();

    return newTrackMember;
  }

  public async getTrackMemberByTrackIdAndMemberId(
    trackId: number,
    memberId: string,
  ) {
    return this.db.query.trackMember.findFirst({
      where: (trackMembers, { and, eq }) =>
        and(
          eq(trackMembers.trackId, trackId),
          eq(trackMembers.memberId, memberId),
        ),
    });
  }
}
