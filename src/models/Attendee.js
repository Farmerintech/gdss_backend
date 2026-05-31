import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    nickname: {
      type: String,
      trim: true,
      maxlength: 60
    },
    profileImageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

attendeeSchema.virtual("uploadedPhotos", {
  ref: "Photo",
  localField: "_id",
  foreignField: "attendee",
  count: true
});

attendeeSchema.index({ fullName: 1 });

export const Attendee = mongoose.model("Attendee", attendeeSchema);
