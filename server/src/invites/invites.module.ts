import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { Invites } from './invites.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Invites])],
  providers: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
