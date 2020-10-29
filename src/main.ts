import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port || 3000;
  await app.listen(port, () => {
    console.log(`Serving Library API on port ${port}`);
  });
}
bootstrap();
