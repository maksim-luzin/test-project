import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { ResetPasswordDto, LoginDto } from './dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() { user }: LoginDto) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('reset')
  reset(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.reset(resetPassword);
  }
}
