
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/createUser.dto';
import {User} from './user.entity';
import {UpdateUserDto} from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(User)
    private postsRepository: Repository<User>
  ) {}

  getAllPosts() {
    console.log('test get all users');
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
  const post = await this.postsRepository.findOne({where: {id:id}});
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdateUserDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({where: {id:id}});
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreateUserDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}