import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import shortid from 'shortid';

import { BaseModel } from './base.schemas';
import { Category } from './category.schema';

@pre<Product>('save', function () {
  this.searchTitle = this.title.toLowerCase();
  this.searchDescription = this.description.toLowerCase();
})
export class Product extends BaseModel {
  @prop({
    type: Number,
    default: () => parseInt(shortid.generate(), 35),
  })
  _id?: number;

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

  @prop({ type: [Number], required: true })
  price!: Number[];

  @prop({ type: String, index: true })
  searchTitle?: string;

  @prop({ type: String, index: true })
  searchDescription?: string;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
