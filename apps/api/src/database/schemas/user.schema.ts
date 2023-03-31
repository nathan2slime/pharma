import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

import { UserRole } from '@/types/auth.types';

import { BaseModel } from './base.schemas';

@pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
})
export class User extends BaseModel {
  @prop({
    type: String,
    default: () => shortid.generate().toUpperCase(),
  })
  _id?: string;

  @prop({ type: String, required: true })
  username!: string;

  @prop({ type: String, required: true, unique: true })
  email!: string;

  @prop({ type: String, required: true, select: false })
  password!: string;

  @prop({ type: [String], default: [] })
  favorites?: String[];

  @prop({ type: [String], default: [] })
  saved?: String[];

  @prop({ type: [String], default: [] })
  cart?: String[];

  @prop({
    enum: UserRole,
    type: String,
    default: [UserRole.USER],
    required: true,
  })
  roles?: UserRole[];
}

const UserModel = getModelForClass(User);

export default UserModel;
