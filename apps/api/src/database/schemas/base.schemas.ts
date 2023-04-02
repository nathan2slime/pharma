import { prop } from '@typegoose/typegoose';

export abstract class BaseModel {
  @prop({ type: Date, default: Date.now })
  created_at?: Date;

  @prop({ type: Date, default: Date.now })
  updated_at?: Date;

  @prop({ type: Date })
  deleted_at?: Date;
}
