import * as dayjs from 'dayjs';
import { IOTP } from '../interfaces/common.interface';

export function generateOTP(): number {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateOtpWithExpiry(): IOTP {
  const otpCode = generateOTP();

  // Set expiration time to 5 minutes from now
  const expirationTime = dayjs()
    .add(Number(process.env.OTP_EXPIRY || 5), 'minutes')
    .toDate();

  return {
    code: otpCode,
    expiresAt: expirationTime,
  };
}
