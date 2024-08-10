import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/user.dto';

@ApiTags('Auth API')
@ApiBearerAuth()
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '유저 로그인, JWT 발급' })
  @ApiBody({ type: LoginDto, description: '로그인 정보 입력' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그인 성공, JWT 발급',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '잘못된 자격 증명',
  })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그인된 유저인지 확인' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 인증 성공',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '유효하지 않은 JWT',
  })
  @Get('protected')
  protected(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: '유저 회원 가입' })
  @ApiBody({ type: RegisterDto, description: '회원 가입 정보 입력' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a user',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created a user',
    };
  }
}
