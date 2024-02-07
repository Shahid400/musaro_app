import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  VerifyOtpReqDto,
  SignUpReqDto,
  UserNameReqDto,
  LoginReqDto,
  ForgotPasswordReqDto,
  ChangePasswordReqDto,
  ResetPasswordReqDto,
  ResendOtpReqDto,
} from './dto/user-req.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpResDto } from './dto/user-res.dto';
import { UserIdDto } from '@shared/dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user-name/:username')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async checkUserName(@Param() payload: UserNameReqDto) {
    return await this.authService.checkUserName(payload);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SignUpResDto })
  async signup(@Body() payload: SignUpReqDto) {
    return await this.authService.signup(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async login(@Body() payload: LoginReqDto): Promise<any> {
    return await this.authService.login(payload);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async resendOtp(@Body() payload: ResendOtpReqDto) {
    return await this.authService.resendOtp(payload);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async verifyOtp(@Body() payload: VerifyOtpReqDto) {
    return await this.authService.verifyOtp(payload);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async forgotPassword(@Body() payload: ForgotPasswordReqDto) {
    return await this.authService.forgotPassword(payload);
  }

  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async changePassword(@Body() payload: ChangePasswordReqDto) {
    return await this.authService.changePassword(payload);
  }

  @Patch('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async resetPassword(
    @Param() param: UserIdDto,
    @Body() payload: ResetPasswordReqDto,
  ) {
    return await this.authService.resetPassword({ ...param, ...payload });
  }
}
