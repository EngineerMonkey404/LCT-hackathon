import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invites } from './invites.model';
import { v4 as uuid } from 'uuid';
import { Role } from '../auth/models/role.enum';

@Injectable()
export class InvitesService {
  constructor(@InjectModel(Invites) private invitesModel: typeof Invites) {}
  async generateInvite(role: Role) {
    const random = uuid();
    await this.invitesModel.create({ path: random, role: role });
    return random;
  }

  async deleteInvite(path: string) {
    await this.invitesModel.destroy({ where: { path: path } });
  }
}
