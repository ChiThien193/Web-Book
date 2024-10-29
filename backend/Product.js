// Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    imageUrl: {type: String, required: true},
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('products', productSchema);

export default Product;
