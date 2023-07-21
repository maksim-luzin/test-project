import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { ProtectedService } from './protected.service';

@ApiTags('Protected')
@Controller('protected')
export class ProtectedController {
  constructor(private readonly protectedService: ProtectedService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProtectedInfo() {
    return this.protectedService.getInfo();
  }
}
