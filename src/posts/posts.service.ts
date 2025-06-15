import { Injectable, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { CreateNewPostDto, UpdatePostDto } from './posts.dto';
import { Prisma, Posts } from '@prisma/client';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private prisma: PrismaService) {}

  async createNewPost(payload: CreateNewPostDto) {
    try {
      return await this.prisma.posts.create({ data: payload, include: { user: true } });
    } catch (err) {
      const errorMsg = 'Post creation has failed';
      this.logger.error(errorMsg, err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errDetails = err.meta?.cause ?? errorMsg;
        throw new BadRequestException(errDetails);
      }

      throw new InternalServerErrorException(errorMsg);
    }
  }

  async getListOfPosts(): Promise<Array<Posts>> {
    return await this.prisma.posts.findMany({ include: { user: true } });
  }

  async getSinglePost(id: number) {
    try {
      return await this.prisma.posts.findUniqueOrThrow({ where: { id } });
    } catch (err) {
      const defaultMsg = `Record was not retrieved for ID: ${id}`;
      this.logger.error(`Record could not be retrieve for ID: ${id}`, err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.meta?.cause ?? defaultMsg;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }

  async updatePost(id: number, payload: UpdatePostDto) {
    try {
      return await this.prisma.posts.update({
        where: { id },
        data: payload,
      });
    } catch (err) {
      const defaultMsg = `Error updating following post -> ID: ${id}`;
      this.logger.error(defaultMsg, err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.meta?.cause ?? defaultMsg;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }

  async deletePost(id: number) {
    try {
      const deletedPost = await this.prisma.posts.delete({ where: { id } });
      return deletedPost.id;
    } catch (err) {
      const msg = `Error deleting post with ID: ${id}`;
      this.logger.error(msg, err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsg = err.meta?.cause ?? err.message ?? msg;
        throw new BadRequestException(errMsg);
      }
      throw err;
    }
  }
}
