export enum UserRole {
  CUSTOMER = 'Customer',
  SERVICE_PROVIDER = 'ServiceProvider',
}

export enum ResponseMessage {
  INVALID_PASSWORD = `Invalid Password. Use 8-15 characters with a mix of letters, numbers & symbols`,
  INVALID_USERNAME = `Invalid user name`,
  INVALID_NAME = `Invalid name`,
  USERNAME_ALREADY_EXISTS = 'user name already exists',
  MOBILE_ALREADY_EXISTS = 'an account against this mobile already exists',
  INVALID_OTP = 'invalid or expired OTP',
}
