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
import { Hash, generateOtpWithExpiry } from '@shared/utils';
import { IOTP } from '@shared/interfaces';
import { ResponseMessage } from '@shared/constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // async checkUserName(payload: { username: string }) {
  //   let { username } = payload;
  //   const userNameExists = await this.userRepository.findOne(
  //     {
  //       username: username.toLowerCase(),
  //     },
  //     { username: 1 },
  //     { notFoundThrowError: false },
  //   );
  //   if (userNameExists)
  //     throw new ConflictException(ResponseMessage.USERNAME_ALREADY_EXISTS);

  //   return null;
  // }

  // async createUser1(payload: IUser) {
  //   const { passwordConfirmation, username, mobile, ...restPayload } = payload;

  //   const mobileExists = await this.userRepository.findOne(
  //     {
  //       mobile,
  //     },
  //     { mobile: 1 },
  //     { notFoundThrowError: false },
  //   );
  //   if (mobileExists)
  //     throw new ConflictException(ResponseMessage.MOBILE_ALREADY_EXISTS);

  //   await this.checkUserName({ username });
  //   restPayload.password = await Hash.make(restPayload.password);

  //   const otp: IOTP = generateOtpWithExpiry();
  //   const response = await this.userRepository.create({
  //     ...restPayload,
  //     username,
  //     mobile,
  //     otp,
  //   });
  //   delete response.otp;
  //   delete response.password;
  //   // TODO: send otp
  //   return response;
  // }

  // async createUser({ password, ...payload }: IUser) {
  //   const { username, mobile } = payload;

  //   // Combine queries to check if username or mobile already exists
  //   const existingUser = await this.userRepository.findOne(
  //     {
  //       $or: [{ username: username.toLowerCase() }, { mobile }],
  //     },
  //     { username: 1, mobile: 1 },
  //     { notFoundThrowError: false },
  //   );

  //   if (existingUser)
  //     throw new ConflictException(
  //       existingUser.username === username.toLowerCase()
  //         ? ResponseMessage.USERNAME_ALREADY_EXISTS
  //         : ResponseMessage.MOBILE_ALREADY_EXISTS,
  //     );

  //   // Hash password and generate OTP asynchronously in parallel
  //   const [hashedPassword, otp] = await Promise.all([
  //     Hash.make(password),
  //     generateOtpWithExpiry(),
  //   ]);

  //   // Create user
  //   const newUser = await this.userRepository.create({
  //     ...payload,
  //     username,
  //     mobile,
  //     password: hashedPassword,
  //     otp,
  //   });

  //   // Omit sensitive fields from response
  //   const { password: _, otp: __, ...response } = newUser;
  //   return response;
  // }

  // async resendOtp(payload: { userId: string }) {
  //   try {
  //     const { userId } = payload;
  //     const otp: IOTP = generateOtpWithExpiry();
  //     await this.userRepository.findOneAndUpdate(
  //       {
  //         _id: userId,
  //       },
  //       { $set: { otp: otp, isVerified: false } },
  //     );
  //     return null;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async verifyOtp(payload: IVerifyOtp) {
  //   try {
  //     const { userId, otpCode } = payload;
  //     const response = await this.userRepository.findOneAndUpdate(
  //       {
  //         _id: userId,
  //         'otp.code': otpCode,
  //         'otp.expiresAt': { $gt: new Date() }, // Check if the OTP is not expired
  //       },
  //       { $set: { otp: null, isVerified: true } },
  //       { notFoundThrowError: false },
  //     );
  //     if (!response) throw new BadRequestException(ResponseMessage.INVALID_OTP);
  //     return null;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(payload: any) {
    return await this.userRepository.findOne({ _id: payload?.id });
  }

  async getUserWithoutException(payload: any) {
    return await this.userRepository.findOne(
      { ...payload },
      {},
      { notFoundThrowError: false },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
