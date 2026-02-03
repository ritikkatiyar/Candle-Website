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
      return !['hero', 'carousel'].includes(this.category);
    },
  },
  price: {
    type: String,
    required: function () {
      return !['hero', 'carousel'].includes(this.category);
    },
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['featured', 'carousel', 'hero', 'collection'],
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