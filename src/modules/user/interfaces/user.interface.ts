export interface IUser {
  role: string;
  mobile: string;
  username: string;
  password: string;
  name: string;
  city: string;
}

export interface IUserRes {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  username: string;
  city: string;
  isActive: boolean;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserName {
  username: string;
}

export interface IVerifyOtp {
  mobile: string;
  otpCode: number;
}
