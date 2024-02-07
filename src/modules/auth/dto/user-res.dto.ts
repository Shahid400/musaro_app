import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from '@shared/dto';

export class SignUpResDto extends ApiResponseDto {
  @ApiProperty({
    example: 'OTP is sent!',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '65c01a36e72d093778fcc7dd',
      name: 'full_name',
      mobile: '123456789',
      role: 'Customer',
      username: 'user_name',
      city: 'city_name',
      isActive: false,
      reason: 'Pending Approval',
      createdAt: '2024-02-04T23:13:58.040Z',
      updatedAt: '2024-02-04T23:13:58.040Z',
    },
  })
  data: any;
}

export class UserResDto extends ApiResponseDto {
  @ApiProperty({
    example: {
      _id: '65c01a36e72d093778fcc7dd',
      name: 'full_name',
      mobile: '123456789',
      role: 'Customer',
      username: 'user_name',
      city: 'city_name',
      isActive: false,
      reason: 'Pending Approval',
      createdAt: '2024-02-04T23:13:58.040Z',
      updatedAt: '2024-02-04T23:13:58.040Z',
    },
  })
  data: any;
}
