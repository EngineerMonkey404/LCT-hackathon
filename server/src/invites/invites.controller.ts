import { Controller } from '@nestjs/common';

@Controller('invites')
export class InvitesController {

    @Get('generate')
    async generateInvite()
}
