export interface IUser {
  role: string;
  mobile: string;
  userName: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  city: string;
}

export interface IUserName {
  userName: string;
}

export interface IVerifyOtp {
  userId: string;
  otpCode: number;
}
