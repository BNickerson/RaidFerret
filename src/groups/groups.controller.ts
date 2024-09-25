import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly membersService: GroupsService) {}
}
