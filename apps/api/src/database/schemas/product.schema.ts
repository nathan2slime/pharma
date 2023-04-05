import { PaginateMethod } from '@/types/paginate.types';
import mongoose, { Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import shortid from 'shortid';

export type Product = {
  _id?: string;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  categories: string[];
  price: number;
  searchTitle?: string;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
  searchDescription?: string;
};

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => shortid.generate().toUpperCase(),
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
  thumb: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
    required: true,
    default: [],
  },
  categories: {
    type: [String],
    required: true,
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  searchTitle: {
    type: String,
    index: true,
  },
  searchDescription: {
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

ProductSchema.pre('save', async function () {
  this.searchTitle = this.title.toLowerCase();
  this.searchDescription = this.description.toLowerCase();
});

ProductSchema.plugin(paginate);

export type ProductType = {
  paginate: PaginateMethod<Product>;
} & Model<Product>;

const ProductModel = mongoose.model('Product', ProductSchema) as ProductType;

export default ProductModel;
