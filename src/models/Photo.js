import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(

    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    publicId: {
      type: String,
      required: true,
      trim: true
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 240
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: 40
      }
    ],
    likes: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

photoSchema.index({ uploaderName: "text", caption: "text", tags: "text" });
photoSchema.index({ createdAt: -1 });
photoSchema.index({ publicId: 1 }, { unique: true });

export const Photo = mongoose.model("Photo", photoSchema);
