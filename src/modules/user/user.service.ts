import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { IUserService } from './interfaces/service.interface';
import { IUser, IVerifyOtp } from './interfaces';
import { generateOtpWithExpiry } from '@shared/utils';
import { IOTP } from '@shared/interfaces';
import { ResponseMessage } from '@shared/constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUserName(payload: { userName: string }) {
    let { userName } = payload;
    const userNameExists = await this.userRepository.findOne(
      {
        userName: userName.toLowerCase(),
      },
      { userName: 1 },
      { notFoundThrowError: false },
    );
    if (userNameExists)
      throw new ConflictException(ResponseMessage.USERNAME_ALREADY_EXISTS);

    return null;
  }

  async create(payload: IUser) {
    const { password, passwordConfirmation, userName, mobile, ...restPayload } =
      payload;

    const mobileExists = await this.userRepository.findOne(
      {
        mobile,
      },
      { mobile: 1 },
      { notFoundThrowError: false },
    );
    if (mobileExists)
      throw new ConflictException(ResponseMessage.MOBILE_ALREADY_EXISTS);

    await this.checkUserName({ userName });
    const hashedPassword = password; // TODO: encrypt password

    const otp: IOTP = generateOtpWithExpiry();
    const response = await this.userRepository.create({
      ...restPayload,
      userName,
      mobile,
      hashedPassword,
      otp,
    });
    delete response.otp;
    delete response.hashedPassword;
    // TODO: send otp
    return response;
  }

  async reSendOtp(payload: { userId: string }) {
    try {
      const { userId } = payload;
      const otp: IOTP = generateOtpWithExpiry();
      await this.userRepository.findOneAndUpdate(
        {
          _id: userId,
        },
        { $set: { otp: otp, isVerified: false } },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(payload: IVerifyOtp) {
    try {
      const { userId, otpCode } = payload;
      const response = await this.userRepository.findOneAndUpdate(
        {
          _id: userId,
          'otp.code': otpCode,
          'otp.expiresAt': { $gt: new Date() }, // Check if the OTP is not expired
        },
        { $set: { otp: null, isVerified: true } },
        { notFoundThrowError: false },
      );
      if (!response) throw new BadRequestException(ResponseMessage.INVALID_OTP);
      return null;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
