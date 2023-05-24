import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Role } from '../auth/models/role.enum';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}
  @Get('generate')
  async generateInvite(@Query('role') role: Role) {
    return await this.invitesService.generateInvite(role);
  }

  @Delete(':path')
  async deleteInvite(@Param('path') path: string) {
    await this.invitesService.deleteInvite(path);
  }
}
