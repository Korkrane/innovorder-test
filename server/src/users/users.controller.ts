
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import UsersService from './users.service';
import {CreateUserDto} from './dto/createUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
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
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
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
}