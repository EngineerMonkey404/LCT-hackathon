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

export const expire = 3600;
export const tokenKey = 'token';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: expire },
      }),
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [
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
