import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/user.dto';

@ApiTags('Auth API')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '유저 로그인, JWT 발급' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그인된 유저인지 확인' })
  @Get('protected')
  protected(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: '유저 회원 가입' })
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Successfully created a user',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return { statusCode: 201, message: 'Successfully created a user' };
  }
}
