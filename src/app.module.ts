import { Module } from '@nestjs/common';
import { MonitoringController } from './monitoring';
import { PrismaModule } from './prisma';
import { UserModule } from '@/users';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [MonitoringController],
  providers: [],
})
export class AppModule {}
