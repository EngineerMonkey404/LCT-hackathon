import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/user.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { expire, tokenKey } from '../auth.module';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
  async registerAccount(user: IUser) {
    const { firstName, secondName, thirdName, email, password, role } = user;
    return await this.userModel.create({
      firstName,
      secondName,
      thirdName,
      email,
      role,
      pwd_hash: await this.hashPassword(password),
    });
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
