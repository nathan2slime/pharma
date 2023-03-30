import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

import { UserRole } from '@/types/auth.types';

import { BaseModel } from './base.schemas';
import { Product } from './product.schema';

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

  @prop({ type: [Product], default: [] })
  favorites?: Product[];

  @prop({ type: [Product], default: [] })
  saved?: Product[];

  @prop({ type: [Product], default: [] })
  cart?: Product[];

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
