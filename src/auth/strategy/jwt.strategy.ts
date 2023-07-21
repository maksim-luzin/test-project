import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { Config } from 'src/enums/config';
import { UserInfoDto } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env[Config.Secret],
    });
  }

  async validate({ _id, name }: UserInfoDto) {
    const isUser = await this.authService.isUser({ _id, name });
    if (!isUser) return null;
    return { _id, name };
  }
}
