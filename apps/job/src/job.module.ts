import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';
import {
  AuthorizationModule,
  DatabaseModule,
  EXPERTISE_SERVICE,
  LoggerModule,
  RmqModule,
} from '@app/common';
import { JobDocument, JobSchema } from './models/job.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: JobDocument.name, schema: JobSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: EXPERTISE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'expertise',
          },
        }),
        inject: [ConfigService],
      },
    ]),

    // RmqModule.register({ name: EXPERTISE_SERVICE }),
  ],
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule {}
