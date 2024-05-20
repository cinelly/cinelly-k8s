import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/src';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class ExpertiseDocument extends AbstractDocument {
  @Prop()
  name: string;
  @Prop()
  description: string;
}
export const ExpertiseSchema = SchemaFactory.createForClass(ExpertiseDocument);
