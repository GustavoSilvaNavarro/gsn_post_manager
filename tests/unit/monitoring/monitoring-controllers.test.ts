import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@/app.module';

export const mockPrismaService = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

import { PrismaService } from '@/prisma';

describe('Monitoring route tests', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /healthz', () => {
    return request(app.getHttpServer()).get('/healthz').expect(204);
  });
});
