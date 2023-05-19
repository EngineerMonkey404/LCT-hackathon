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
    const { firstName, secondName, thirdName, email, password } = user;
    console.log('user', user);
    return await this.userModel.create({
      firstName,
      secondName,
      thirdName,
      email,
      pwd_hash: await this.hashPassword(password),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    const valid = await bcrypt.compare(password, user.pwd_hash);
    if (user && valid) {
      return user;
    }
    return null;
  }

  async giveToken(user: IUser, res: Response) {
    const token = this.jwtService.sign({ user });
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
