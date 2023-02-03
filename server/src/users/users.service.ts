
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/createUser.dto';
import {User} from './user.entity';
import {UpdateUserDto} from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
  const user = await this.usersRepository.findOne({where: {id:id}});
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getUserByLogin(login: string) {
  const user = await this.usersRepository.findOne({where: {login:login}});
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const hashedPassword = await this.hashPassword(user.password);
    await this.usersRepository.update(id, {...user,  password: hashedPassword});
    const updatedUser = await this.usersRepository.findOne({where: {id:id}});
    if (updatedUser) {
      return updatedUser
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  generateToken(user: User) {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  };

  async createUser(user: CreateUserDto) {
    const duplicateUser = await this.usersRepository.findOne({where: {login:user.login}});
    if(duplicateUser)
      throw new HttpException(`User with that login already exist`, HttpStatus.CONFLICT);

    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.usersRepository.create({ ...user, password: hashedPassword });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}