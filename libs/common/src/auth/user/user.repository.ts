import { Model } from 'mongoose';
import { AbstractDocument, AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';

@Injectable()
export class JobRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(JobRepository.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
