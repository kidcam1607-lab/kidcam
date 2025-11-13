import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    albumSlug: {
      type: String,
      required: true,
      unique: true,
    },
    albumTitle: String,
    coverImage: String,
    password: String,
    photos: [
      {
        url: String,
        uploadedAt: { type: Date, default: Date.now },
        order: Number,
      },
    ],
    expiryDate: Date,
    views: { type: Number, default: 0 },
    downloads: [
      {
        photoIndex: Number,
        downloadedAt: { type: Date, default: Date.now },
      },
    ],
    clientEmail: String,
    clientPhone: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
