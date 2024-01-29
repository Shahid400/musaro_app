import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<any>
    findAll(): string
    findOne(id: number): string
    update(id: number, updateUserDto: UpdateUserDto): string
    remove(id: number): string
}