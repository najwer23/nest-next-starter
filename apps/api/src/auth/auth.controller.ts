import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { CurrentUser, Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { AuthTokensOutput, LoginArgs, RefreshArgs, RegisterArgs, UserProfileOutput } from './models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register new user (gets ANALYST role)' })
  async register(@Body() body: RegisterArgs): Promise<AuthTokensOutput> {
    this.logger.log({
      message: 'POST /auth/register',
      meta: { email: body.email },
    });
    return this.authService.register(body);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() body: LoginArgs): Promise<AuthTokensOutput> {
    this.logger.log({
      message: 'POST /auth/login',
      meta: { email: body.email },
    });
    return this.authService.login(body);
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  async refresh(@Body() body: RefreshArgs): Promise<AuthTokensOutput> {
    this.logger.log({ message: 'POST /auth/refresh' });
    return this.authService.refresh(body.refreshToken);
  }

  @Post('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async me(@CurrentUser() user: User): Promise<UserProfileOutput> {
    this.logger.log({ message: 'POST /auth/me', meta: { userId: user.id } });
    return this.authService.mapToProfileOutput(user);
  }
}
