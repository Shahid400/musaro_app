import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponseMessage, UserRole } from '@shared/constants';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserNameReqDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_-]{2,25}$/, {
    message:
      'Username must start with an alphabet and can contain alphanumeric characters, hyphens, or underscores. It should be between 3 and 26 characters long.',
  })
  // @Length(1, 20, {
  //   message: 'Username can be max 20 characters long.',
  // })
  username: string;
}

export class SignUpReqDto {
  @ApiProperty({ example: UserRole.CUSTOMER, enum: UserRole })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: '03123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
    message:
      'Username must start with an alphabet and can contain alphanumeric characters.',
  })
  @Length(1, 20, {
    message: 'Username can be max 20 characters long.',
  })
  username: string;

  @ApiProperty({ example: 'Abc@1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  password: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'city' })
  @IsString()
  @IsNotEmpty()
  city: string;
}

export class LoginReqDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Abc@1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResendOtpReqDto {
  @ApiProperty({ example: '03123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;
}

export class VerifyOtpReqDto {
  @ApiProperty({ example: '03123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: '12345' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  otpCode: number;
}

export class ForgotPasswordReqDto {
  @ApiProperty({ example: '03123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;
}

export class ChangePasswordReqDto {
  @ApiProperty({ example: '03123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: 'Abc@1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  password: string;
}

export class ResetPasswordReqDto {
  @ApiProperty({ example: 'Abc@1234' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'Abc@1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  newPassword: string;
}
