import { prop } from '@typegoose/typegoose';

export abstract class BaseModel {
  @prop({ default: Date.now })
  created_at?: Date;

  @prop({ default: Date.now })
  updated_at?: Date;

  @prop()
  deleted_at?: Date;
}
