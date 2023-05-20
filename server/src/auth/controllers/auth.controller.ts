import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUser } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/userDto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RequireRoles } from '../guards/roles.decorator';
import { Role } from '../models/role.enum';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователей' })
  @ApiBody({ type: UserDto })
  @Post('register')
  async register(@Body() user: IUser) {
    return await this.authService.registerAccount(user);
  }

  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Логин пользователя' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.giveToken(req.user, res);
    console.log('token otdan');
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Get('login')
  loginCheck(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Delete('login')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.deleteToken(res);
  }

  @RequireRoles(Role.CURATOR)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @Get('broker')
  getSomething() {
    return 'curator role';
  }
}
