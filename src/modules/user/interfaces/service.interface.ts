import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<any>;
  findAll(): any;
  findOne(id: number): any;
  update(id: number, updateUserDto: UpdateUserDto): any;
  remove(id: number): any;
}
