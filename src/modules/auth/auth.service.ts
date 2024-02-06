import { Injectable } from '@nestjs/common';
import { SignUpReqDto } from './dto/user-req.dto';

@Injectable()
export class AuthService {
  async create(createAuthDto: SignUpReqDto) {
    return 'This action adds a new auth';
  }

  async findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
