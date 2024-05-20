import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/src';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  sub: string;
  @Prop()
  aud: string;
  @Prop()
  iat: string;
  @Prop()
  exp: string;
  @Prop()
  azp: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
