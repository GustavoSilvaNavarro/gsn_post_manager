import { Controller, HttpCode, HttpStatus, Post, Logger, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { CreateNewPostDto } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly postService: PostsService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async addNewPost(@Body() new_post: CreateNewPostDto) {
    return await this.postService.createNewPost(new_post);
  }
}
