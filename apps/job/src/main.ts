import { NestFactory } from '@nestjs/core';
import { JobModule } from './job.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JOB_SERVICE, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);
  // const rmqService = app.get(RmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')],
      queue: 'job',
      noAck: false,
      persistent: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('jobs')
    .setDescription('The jobs API description')
    .setVersion('1.0')
    .addTag('jobs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.connectMicroservice(rmqService.getOptions(JOB_SERVICE));
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
