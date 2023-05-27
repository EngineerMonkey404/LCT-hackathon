import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/user.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { expire, tokenKey } from '../auth.module';
import { Invites } from '../../invites/invites.model';
import { Role } from '../models/role.enum';

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
    const {
      firstName,
      secondName,
      thirdName,
      email,
      password,
      role,
      direction,
      organization,
    } = user;
    return await this.userModel.create({
      firstName,
      secondName,
      thirdName,
      email,
      role,
      direction,
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
      await this.inviteModel.destroy({ where: { path: path } });
      if (role === Role.FRAME)
        return await this.userModel.create({
          firstName,
          secondName,
          thirdName,
          email,
          direction,
          organizationCoordinateX: organization.coordinates[0] ?? 0,
          organizationCoordinateY: organization.coordinates[1] ?? 0,
          organizationName: organization.name,
          organizationAddress: organization.address,
          role,
          pwd_hash: await this.hashPassword(password),
        });
      else if (role === Role.MENTOR)
        return await this.userModel.create({
          firstName,
          secondName,
          thirdName,
          email,
          direction,
          role,
          pwd_hash: await this.hashPassword(password),
        });
    } else throw new HttpException('Path isnt found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number) {
    return await this.userModel.findOne({ where: { userId: id } });
  }

  async getRoleByInvite(path: string) {
    return (await this.inviteModel.findOne({ where: { path: path } })).role;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    if (user) {
      const valid = await bcrypt.compare(password, user.pwd_hash);

      if (valid) {
        delete user.dataValues.pwd_hash;
        const u = {
          ...user.dataValues,
          organization: {
            name: user.organizationName,
            address: user.organizationAddress,
            coordinates: [
              user.organizationCoordinateX,
              user.organizationCoordinateY,
            ],
          },
        };
        delete u.organization;
        return u;
      }
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

  async checkEmail(email: string) {
    const e = await this.userModel.findOne({ where: { email: email } });
    return !!e;
  }
}
