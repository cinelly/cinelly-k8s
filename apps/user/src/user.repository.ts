import { AbstractDocument, AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument } from './models/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(UsersDocument.name) UserModel: Model<UsersDocument>,
  ) {
    super(UserModel);
  }
}
