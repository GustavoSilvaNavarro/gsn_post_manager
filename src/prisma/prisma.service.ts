import { Injectable, INestApplication, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name); // Add a logger

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma client connected to the database.');
    } catch (err) {
      this.logger.error('Failed to connect Prisma client to the database.', err);
      // Depending on your application's needs, you might want to rethrow or handle this differently
      throw err;
    }
  }

  enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      void app.close();
    });
  }
}
