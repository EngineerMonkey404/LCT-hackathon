import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUser } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../models/userDto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RequireRoles } from '../guards/roles.decorator';
import { Role } from '../models/role.enum';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';

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

  @ApiOperation({ summary: 'Регистрация пользователей через приглашение' })
  @ApiBody({ type: UserDto })
  @Post('register/:path')
  async registerThroughInvite(
    @Body() user: IUser,
    @Param('path') path: string,
  ) {
    return await this.authService.registerAccountThroughInvite(user, path);
  }

  @ApiOperation({ summary: 'Получение роли по приглашению' })
  @Get('invite/:path')
  async getRoleByInvite(@Param('path') path: string) {
    return await this.authService.getRoleByInvite(path);
  }

  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Логин пользователя' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.giveToken(req.user, res);
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

  @Get('user/:id')
  async getUserById(@Param('id') id: number) {
    return await this.authService.getUserById(id);
  }

  @Get('user/check-email/:email')
  async checkEmail(@Param('email') email: string) {
    return await this.authService.checkEmail(email);
  }
}
