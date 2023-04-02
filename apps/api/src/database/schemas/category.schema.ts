import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import shortid from 'shortid';

import { BaseModel } from './base.schemas';

@pre<Category>('save', function () {
  this.searchName = this.name.toLowerCase();
})
export class Category extends BaseModel {
  @prop({
    type: String,
    default: () => shortid.generate().toUpperCase(),
  })
  _id?: string;

  @prop({ type: String, required: true, index: true })
  name!: string;

  @prop({ type: String, required: true, default: 'blue' })
  color!: string;

  @prop({ type: String, index: true })
  searchName?: string;
}

const CategoryModel = getModelForClass(Category);

export default CategoryModel;
