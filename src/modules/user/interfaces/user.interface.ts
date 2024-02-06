export interface IUser {
  role: string;
  mobile: string;
  userName: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  city: string;
}

export interface IUserRes {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  userName: string;
  city: string;
  isActive: boolean;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserName {
  userName: string;
}

export interface IVerifyOtp {
  userId: string;
  otpCode: number;
}
