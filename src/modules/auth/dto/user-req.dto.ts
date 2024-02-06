import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponseMessage, UserRole } from '@shared/constants';
import { UserIdDto } from '@shared/dto';
import { SameAs } from '@shared/utils';
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
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
    message:
      'Username must start with an alphabet and can contain alphanumeric characters.',
  })
  @Length(1, 20, {
    message: 'Username can be max 20 characters long.',
  })
  userName: string;
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
  userName: string;

  @ApiProperty({ example: 'Abc@123' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  password: string;

  @ApiProperty({ example: 'Abc@123' })
  @IsString()
  @IsNotEmpty()
  @SameAs(`password`)
  passwordConfirmation: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'city' })
  @IsString()
  @IsNotEmpty()
  city: string;
}

export class VerifyOtpReqDto extends UserIdDto {
  @ApiProperty({ example: '65c0206ac4f42c21f12e1bbb' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  otpCode: number;
}
