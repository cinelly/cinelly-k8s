import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, UserDocument } from '@app/common';

@Schema({ versionKey: false })
export class JobDocument extends AbstractDocument {
  @Prop()
  user: UserDocument[];
  @Prop()
  expertise: string[];
  @Prop()
  subject: string;
  @Prop()
  description: string;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  budget: number;
  @Prop()
  location: string;
  @Prop()
  timestamp: Date;
}

export const JobSchema = SchemaFactory.createForClass(JobDocument);
