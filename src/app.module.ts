import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { UserModule } from '@/users';
import { MonitoringModule } from './monitoring';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule, UserModule, MonitoringModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
