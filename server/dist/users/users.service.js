"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor() {
        this.lastPostId = 0;
        this.posts = [];
    }
    getAllPosts() {
        console.log('test');
        return this.posts;
    }
    getPostById(id) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            return post;
        }
        throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
    }
    replacePost(id, post) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts[postIndex] = post;
            return post;
        }
        throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
    }
    createPost(post) {
        const newPost = Object.assign({ id: ++this.lastPostId }, post);
        this.posts.push(newPost);
        return newPost;
    }
    deletePost(id) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
        }
        else {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
exports.default = PostsService;
//# sourceMappingURL=users.service.js.map