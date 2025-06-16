import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateNewPostDto, UpdatePostDto } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly postService: PostsService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async addNewPost(@Body() newPost: CreateNewPostDto) {
    return await this.postService.createNewPost(newPost);
  }

  @Get('single/:id')
  @HttpCode(HttpStatus.OK)
  async getSinglePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.getSinglePost(id);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getListOfPosts() {
    return await this.postService.getListOfPosts();
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePostDto) {
    return await this.postService.updatePost(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    const deletedPost = await this.postService.deletePost(id);
    return { msg: `Success to remove post with ID: ${deletedPost.id}` };
  }
}
