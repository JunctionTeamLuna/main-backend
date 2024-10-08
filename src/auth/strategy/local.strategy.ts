import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'useremail' });
  }

  async validate(useremail: string, password: string): Promise<any> {
    //passport 의 특성상 파라미터를 받을때 username, password로 받아야함
    const user = await this.authService.validateUser(useremail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
