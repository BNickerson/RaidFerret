import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { DatabaseModule } from 'src/database/database.module';
import { MembersController } from './members.controller';

@Module({
  imports: [DatabaseModule],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
