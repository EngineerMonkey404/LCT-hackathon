import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { LocalStrategy } from './guards/local.strategy';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { Image } from '../files/models/image.model';
import { Invites } from '../invites/invites.model';

export const expire = 3600 * 1000;
export const tokenKey = 'token';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: expire },
      }),
    }),
    SequelizeModule.forFeature([User, Image, Invites]),
  ],
  providers: [
    RolesGuard,
    AuthService,
    JwtGuard,
    JwtStrategy,
    LocalStrategy,
    PassportModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
