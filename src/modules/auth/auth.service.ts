import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { IUser, IVerifyOtp, User, UserRepository } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessage } from '@shared/constants';
import { Hash, generateOtpWithExpiry } from '@shared/utils';
import { IOTP } from '@shared/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async checkUserName(payload: { userName: string }) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  private async createUser({ password, ...payload }: IUser) {
    const { userName, mobile } = payload;

    // Combine queries to check if username or mobile already exists
    const existingUser = await this.userRepository.findOne(
      {
        $or: [{ userName: userName.toLowerCase() }, { mobile }],
      },
      { userName: 1, mobile: 1 },
      { notFoundThrowError: false },
    );

    if (existingUser)
      throw new ConflictException(
        existingUser.userName === userName.toLowerCase()
          ? ResponseMessage.USERNAME_ALREADY_EXISTS
          : ResponseMessage.MOBILE_ALREADY_EXISTS,
      );

    // Hash password and generate OTP asynchronously in parallel
    const [hashedPassword, otp] = await Promise.all([
      Hash.make(password),
      generateOtpWithExpiry(),
    ]);

    // Create user
    const newUser = await this.userRepository.create({
      ...payload,
      userName,
      mobile,
      password: hashedPassword,
      otp,
    });

    // Omit sensitive fields from response
    const { password: _, otp: __, ...response } = newUser;
    return response;
  }

  private async createToken(
    user: User,
    expiryTime?: number | string,
    subject?: string,
  ) {
    return {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(
        { userId: user._id },
        {
          subject: subject ? process.env.JWT_SECRET_KEY + user.password : '',
          expiresIn: expiryTime ? expiryTime : process.env.JWT_EXPIRATION_TIME,
        },
      ),
      user: {
        userId: user._id,
        role: user.role,
        mobile: user.mobile,
        userName: user.userName,
        city: user.city,
      },
    };
  }

  async signup(payload: IUser) {
    return new Promise<User>(async (resolve, reject) => {
      await this.createUser(payload)
        .then(async (user: User) => {
          await this.createToken(user);
          return resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async login(payload: any) {
    try {
      const { userName, password } = payload;
      const user = await this.userRepository.findOne(
        { userName },
        {},
        { notFoundThrowError: false },
      );
      if (!user) {
        throw new BadRequestException(
          ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        );
      }
      const isValidPassword = await Hash.compare(password, user.password);
      if (!isValidPassword) {
        throw new BadRequestException(
          ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        );
      }
      return await this.createToken(user);
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(payload: { userId: string }) {
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

  async forgotPassword(payload: any) {
    try {
      //
      return null;
    } catch (error) {
      throw error;
    }
  }
}
