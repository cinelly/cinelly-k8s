import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'libs/common/src/database/abstract.repository';
import { AbstractDocument } from 'libs/common/src';
import { InjectModel } from '@nestjs/mongoose';
import { connection, Model } from 'mongoose';
import { ExpertiseDocument } from './models/expertise.schema';
@Injectable()
export class ExpertiseRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(ExpertiseRepository.name);

  constructor(
    @InjectModel(ExpertiseDocument.name)
    expertiseModel: Model<ExpertiseDocument>,
  ) {
    super(expertiseModel);
  }
}
