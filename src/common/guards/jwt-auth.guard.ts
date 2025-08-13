import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserService } from 'src/modules/user/user.service';

// Extend Express Request interface to include jwtPayLoad and user
declare module 'express-serve-static-core' {
  interface Request {
    jwtPayLoad?: {
      sub: string;
      [key: string]: any;
    };
    user?: any;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        [key: string]: any;
      }>(token, {
        secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
      });

      request['jwtPayLoad'] = payload;

      const user = await this.userService.findById(Number(payload.sub));

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Invaild or missing AccessToken');
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
