import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

export type Category = {
  _id?: string;
  name: string;
  color: string;
  searchName?: string;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
};

const CategorySchema = new Schema({
  _id: {
    type: String,
    default: () => shortid.generate().toUpperCase(),
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  color: {
    type: String,
    required: true,
    default: 'blue',
  },
  searchName: {
    type: String,
    index: true,
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

CategorySchema.pre<Category>('save', function () {
  this.searchName = this.name.toLowerCase();
});

const CategoryModel = mongoose.model<Category>('Category', CategorySchema);

export default CategoryModel;
