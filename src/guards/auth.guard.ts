import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // @Inject(SERVICES.USER_ACCOUNT) private readonly authService: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<boolean>(
      'authenticatedOnly',
      context.getHandler(),
    );
    if (!secured) return true;

    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = ''; // TODO: implement function to verify token
      // await firstValueFrom(
      //   this.authService.send(VERIFY_TOKEN, { token: authToken })
      // );
      request.user = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
