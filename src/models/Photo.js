import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    uploaderName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    attendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendee"
    },
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
