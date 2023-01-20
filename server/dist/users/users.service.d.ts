import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Repository } from 'typeorm';
export default class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<User>);
    getAllPosts(): Promise<User[]>;
    getPostById(id: number): Promise<User>;
    updatePost(id: number, post: UpdateUserDto): Promise<User>;
    createPost(post: CreateUserDto): Promise<User>;
    deletePost(id: number): Promise<void>;
}
