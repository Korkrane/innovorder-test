import PostsService from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export default class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): Promise<import("./user.entity").User[]>;
    getPostById(id: string): Promise<import("./user.entity").User>;
    createPost(post: CreateUserDto): Promise<import("./user.entity").User>;
    replacePost(id: string, post: UpdateUserDto): Promise<import("./user.entity").User>;
    deletePost(id: string): Promise<void>;
}
