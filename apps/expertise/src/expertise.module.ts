import { Module } from '@nestjs/common';
import { ExpertiseController } from './expertise.controller';
import { ExpertiseService } from './expertise.service';
import {
  AuthorizationModule,
  DatabaseModule,
  JOB_SERVICE,
  LoggerModule,
  RmqModule,
} from '@app/common';
import { ExpertiseDocument, ExpertiseSchema } from './models/expertise.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExpertiseRepository } from './expertise.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthorizationModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ExpertiseDocument.name, schema: ExpertiseSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: JOB_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'job',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ExpertiseController],
  providers: [ExpertiseService, ExpertiseRepository],
})
export class ExpertiseModule {}
