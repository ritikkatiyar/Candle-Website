import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['hero', 'about', 'story', 'features', 'collections', 'care-tips', 'reviews', 'contact']
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
ContentSchema.index({ section: 1, order: 1 });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);