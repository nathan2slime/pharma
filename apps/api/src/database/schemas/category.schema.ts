import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import shortid from 'shortid';

import { BaseModel } from './base.schemas';

@pre<Category>('save', function () {
  this.searchName = this.name.toLowerCase();
})
export class Category extends BaseModel {
  @prop({
    type: Number,
    default: () => parseInt(shortid.generate(), 35),
  })
  _id?: number;

  @prop({ required: true, index: true })
  name!: string;

  @prop({ index: true })
  searchName?: string;
}

const CategoryModel = getModelForClass(Category);

export default CategoryModel;
