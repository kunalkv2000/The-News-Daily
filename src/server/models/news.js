import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    source: String,
    image: String,
    publishedAt: Date,
    category: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const News = mongoose.model('News', newsSchema);

export default News;
