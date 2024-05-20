import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AbstractDocument,
  ExpertiseModel,
  IdExpertiseDto,
  UserDocument,
  UserModel,
} from '@app/common';
import { AvailabilityModel } from './availability.model';

@Schema({ versionKey: false })
export class UsersDocument extends AbstractDocument {
  @Prop()
  user: UserModel;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  company_name: string;
  @Prop()
  phone_number: string;
  @Prop()
  expertise: ExpertiseModel[];
  @Prop()
  city: string;
  @Prop()
  email_invite: string[];
  @Prop()
  profile_description: string;
  @Prop()
  website_url: string;
  @Prop()
  availability: AvailabilityModel[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
