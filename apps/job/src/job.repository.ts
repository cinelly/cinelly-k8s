import { Model } from 'mongoose';
import { AbstractDocument, AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { JobDocument } from './models/job.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(JobRepository.name);

  constructor(@InjectModel(JobDocument.name) jobModel: Model<JobDocument>) {
    super(jobModel);
  }
}
