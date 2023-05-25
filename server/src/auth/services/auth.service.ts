import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/user.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { expire, tokenKey } from '../auth.module';
import { Invites } from '../../invites/invites.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Invites) private inviteModel: typeof Invites,
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
  async registerAccount(user: IUser) {
    const { firstName, secondName, thirdName, email, password, role, direction, organization } = user;
    return await this.userModel.create({
      firstName,
      secondName,
      thirdName,
      email,
      role,
      direction,
      organization,
      pwd_hash: await this.hashPassword(password),
    });
  }

  async registerAccountThroughInvite(user: IUser, path: string) {
    const p = await this.inviteModel.findOne({ where: { path: path } });
    if (p) {
      const {
        firstName,
        secondName,
        thirdName,
        email,
        password,
        organization,
        direction,
      } = user;
      const role = p.role;
      return await this.userModel.create({
        firstName,
        secondName,
        thirdName,
        email,
        direction,
        organization,
        role,
        pwd_hash: await this.hashPassword(password),
      });
    } else return Error;
  }

  async getRoleByInvite(path: string) {
    return (await this.inviteModel.findOne({ where: { path: path } })).role;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    const valid = await bcrypt.compare(password, user.pwd_hash);
    if (user && valid) {
      delete user.dataValues.pwd_hash;
      return user;
    }
    return null;
  }

  async giveToken(user: IUser, res: Response) {
    const token = await this.jwtService.signAsync({ user });
    res.cookie(tokenKey, token, {
      maxAge: expire,
      httpOnly: true,
      signed: true,
    });
  }

  async deleteToken(res: Response) {
    res.clearCookie(tokenKey);
  }
}
