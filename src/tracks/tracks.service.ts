import { Inject, Injectable, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from 'src/database/database.schema';
import { trackMember } from 'src/database/database.schema';
import { DiscordService } from 'src/discord/services/discord.service';

const getLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 50));
};

@Injectable()
export class TracksService {
  private readonly logger = new Logger(TracksService.name);
  private xpCooldowns = new Map<string, number>();
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
    private readonly discordService: DiscordService,
  ) {}

  /**
   * Calculate the XP to award a member based on base XP, percentage randomness, and an XP multiplier.
   */
  private calculateXp(
    baseXp: number,
    randomizePercent: number,
    xpMultiplier: number,
  ): number {
    // Calculate the randomized factor, e.g., if randomizePercent is 10, baseXp will vary between 90% to 110%
    const randomFactor =
      1 + (Math.random() * (randomizePercent * 2) - randomizePercent) / 100;

    // Apply the randomness to base XP
    const randomizedXp = baseXp * randomFactor;

    // Multiply the randomized XP by the track's XP multiplier
    const finalXp = randomizedXp * xpMultiplier;

    // Return the final XP amount, rounded down to an integer
    return Math.floor(finalXp);
  }

  private isOnCooldown(cooldownKey: string) {
    if (this.xpCooldowns.has(cooldownKey)) return true;
    return false;
  }

  public async getTracksByGuildId(guildId: string) {
    return this.db.query.track.findMany({
      where: (track, { eq }) => eq(track.guildId, guildId),
    });
  }

  public async processMessageXp(guildId: string, memberId: string) {
    const tracks = await this.getTracksByGuildId(guildId);
    if (!tracks) return;

    for (const track of tracks) {
      const cooldownKey = `${track.id}-${memberId}`;
      if (this.isOnCooldown(cooldownKey)) continue;
      this.xpCooldowns.set(cooldownKey, Date.now());
      setTimeout(() => {
        this.xpCooldowns.delete(cooldownKey);
      }, 10000);

      const xpAmount = this.calculateXp(
        track.baseXp,
        track.baseXpRandomizePercent,
        track.xpMultiplier,
      );
      const updatedTrackMember = await this.addXpToTrackMember(
        track.id,
        memberId,
        xpAmount,
      );
      const previousLevel = getLevel(updatedTrackMember.trackXp - xpAmount);
      const currentLevel = getLevel(updatedTrackMember.trackXp);
      this.logger.log(
        `Previous level: ${previousLevel}, Current level: ${currentLevel}`,
      );
      if (previousLevel !== currentLevel) {
        this.logger.log(`User ${memberId} leveled up in track ${track.id}`);
        const rewards = await this.db.query.trackReward.findMany({
          where: (trackRewards, { and, eq }) =>
            and(
              eq(trackRewards.trackId, track.id),
              eq(trackRewards.level, currentLevel),
            ),
        });
        if (rewards.length > 0) {
          this.logger.log(
            `User ${memberId} earned ${rewards.length} rewards for leveling up`,
          );
          const rewardsWithRoles = rewards.filter((x) => x.isRoleReward);
          const roleId = rewardsWithRoles.map((x) => x.roleId);
          await this.discordService.addMembertoRoles(guildId, memberId, roleId);
          return;
        }
      }
    }
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

      return updatedTrackMember[0];
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

    return newTrackMember[0];
  }

  public async getTrackMemberByMemberId(memberId: string) {
    return this.db.query.trackMember.findMany({
      where: (trackMembers, { eq }) => eq(trackMembers.memberId, memberId),
      with: {
        track: true,
      },
    });
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
