import { CreateUserDto } from './dto/createUser.dto';
import { User } from './users.interface';
import { UpdateUserDto } from './dto/updateUser.dto';
export default class PostsService {
    private lastPostId;
    private posts;
    getAllPosts(): User[];
    getPostById(id: number): User;
    replacePost(id: number, post: UpdateUserDto): UpdateUserDto;
    createPost(post: CreateUserDto): {
        content: string;
        title: string;
        id: number;
    };
    deletePost(id: number): void;
}
