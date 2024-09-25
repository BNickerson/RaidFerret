import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
