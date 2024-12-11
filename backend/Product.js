// Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, 
    author: { type: String, required: true },
    genre: { type: String, required: true },
    supplier: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    format: { type: String, required: true },
  },
  { timestamps: true }
);


const Product = mongoose.model('products', productSchema);

export default Product;
