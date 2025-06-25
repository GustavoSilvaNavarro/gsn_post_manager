import '@dotenvx/dotenvx/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { XApiProviderInterceptor } from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register global middlewares
  app.useGlobalInterceptors(new XApiProviderInterceptor());

  await app.listen(PORT ?? 3000);
}
bootstrap()
  .then(() => console.log(`Server Running on PORT: ${PORT}...`))
  .catch((err) => {
    console.error('Error starting server...', err);
    process.exit(1);
  });
