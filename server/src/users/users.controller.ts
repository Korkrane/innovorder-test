
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Res, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import UsersService from './users.service';
import {CreateUserDto} from './dto/createUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from './auth.guard';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve data of all users' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve data of user :id' })
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update a user' })
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  async deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(Number(id));
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to the app' })
  async login(  @Body() loginData: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(loginData.login);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const isValid = await bcrypt.compare(loginData.password, user.password);
    if (!isValid)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const token =  this.usersService.generateToken(user);
    return { token: token };
  }

}