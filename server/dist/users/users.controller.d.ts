import PostsService from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export default class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): import("./users.interface").User[];
    getPostById(id: string): import("./users.interface").User;
    createPost(post: CreateUserDto): Promise<{
        content: string;
        title: string;
        id: number;
    }>;
    replacePost(id: string, post: UpdateUserDto): Promise<UpdateUserDto>;
    deletePost(id: string): Promise<void>;
}
