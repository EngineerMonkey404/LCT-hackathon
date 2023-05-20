import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { tokenKey } from '../auth.module';

export const cookieExtractor: JwtFromRequestFunction = (req) => {
  return req.signedCookies[tokenKey] ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
