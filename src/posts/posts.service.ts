import { Injectable, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { CreateNewPostDto } from './posts.dto';
import { Prisma } from '@prisma/client';

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

      throw new InternalServerErrorException('An unexpected error occurred during user creation.');
    }
  }
}
