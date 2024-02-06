import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  VerifyOtpReqDto,
  SignUpReqDto,
  UserNameReqDto,
} from './dto/user-req.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { SignUpResDto } from './dto/user-res.dto';
import { UserIdDto } from '@shared/dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('user-name')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async checkUserName(@Param() payload: UserNameReqDto) {
    return await this.userService.checkUserName(payload);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SignUpResDto })
  async signup(@Body() payload: SignUpReqDto) {
    return await this.userService.create(payload);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async reSendOtp(@Body() payload: UserIdDto) {
    return await this.userService.reSendOtp(payload);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResDto })
  async verifyOtp(@Body() payload: VerifyOtpReqDto) {
    return await this.userService.verifyOtp(payload);
  }
}
