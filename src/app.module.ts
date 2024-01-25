import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ExceptionsFilter } from './filters';
import { ResponseInterceptor } from './interceptors';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
