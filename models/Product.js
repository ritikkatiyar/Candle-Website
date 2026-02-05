// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: function () {
      return true;
    },
  },
  price: {
    type: String,
    required: function () {
      return true;
    },
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ['featured', 'collection'],
    required: true,
  },
  productType: {
    type: String,
    enum: ['candles', 'diffusers', 'gift-cards'],
    default: 'candles',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);