import { PaginateMethod } from '@/types';
import { prop, getModelForClass, pre, plugin } from '@typegoose/typegoose';
import paginate from 'mongoose-paginate-v2';
import shortid from 'shortid';

import { BaseModel } from './base.schemas';
import { Category } from './category.schema';

@pre<Product>('save', function () {
  this.searchTitle = this.title.toLowerCase();
  this.searchDescription = this.description.toLowerCase();
})
@plugin(paginate)
export class Product extends BaseModel {
  @prop({
    type: String,
    default: () => shortid.generate().toUpperCase(),
  })
  _id?: string;

  @prop({ type: String, required: true, index: true })
  title!: string;

  @prop({ type: String, required: true, index: true })
  description!: string;

  @prop({ type: String, required: true })
  thumb!: string;

  @prop({ type: [String], required: true, default: [] })
  gallery!: string[];

  @prop({ type: [Category], required: true, default: [] })
  categories!: Category[];

  @prop({ type: Number, required: true })
  price!: number;

  @prop({ type: String, index: true })
  searchTitle?: string;

  @prop({ type: String, index: true })
  searchDescription?: string;

  static paginate: PaginateMethod<Product>;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
