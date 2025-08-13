import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserReq } from '../../common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiOperationDecorator } from 'src/common/decorators/api-operation.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperationDecorator({
    summary: 'User registration',
    description: 'User registration',
  })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperationDecorator({
    summary: 'User login',
    description: 'User login',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperationDecorator({
    summary: 'User profile',
    description: 'User profile',
  })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@UserReq() user: User) {
    return user;
  }
}
