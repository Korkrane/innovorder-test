
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './users.service';
import {CreateUserDto} from './dto/createUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve data of all users' })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve data of user :id' })
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  async createPost(@Body() post: CreateUserDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update a user' })
  async replacePost(@Param('id') id: string, @Body() post: UpdateUserDto) {
    return this.postsService.replacePost(Number(id), post);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}