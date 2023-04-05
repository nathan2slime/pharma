import mongoose from 'mongoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

import { UserRole } from '@/types/auth.types';

export type User = {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  favorites?: string[];
  saved?: string[];
  cart?: string[];
  roles?: string[];
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
};

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => shortid.generate().toUpperCase(),
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  favorites: {
    type: [String],
    default: [],
  },
  saved: {
    type: [String],
    default: [],
  },
  cart: {
    type: [String],
    default: [],
  },
  roles: {
    type: [String],
    default: [UserRole.USER],
    enum: Object.values(UserRole),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
