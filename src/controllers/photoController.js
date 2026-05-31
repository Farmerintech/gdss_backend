import mongoose from "mongoose";
import { Photo } from "../models/Photo.js";

export async function getPhotos(req, res, next) {
  try {
    const { attendeeId } = req.query;
    const search = req.query.search?.trim();
    const query = {};

    if (attendeeId) {
      if (!mongoose.Types.ObjectId.isValid(attendeeId)) {
        res.status(400);
        throw new Error("Invalid attendeeId");
      }
      query.attendee = attendeeId;
    }
    if (search) query.$text = { $search: search };

    const photos = await Photo.find(query)
      .populate("attendee", "fullName nickname profileImageUrl")
      .sort({ createdAt: -1 });

    res.json({ data: photos });
  } catch (error) {
    next(error);
  }
}

export async function createPhoto(req, res, next) {
  try {
    const photo = await Photo.create({
      uploaderName: req.body.uploaderName,
      attendee: req.body.attendeeId || undefined,
      imageUrl: req.body.imageUrl,
      publicId: req.body.publicId,
      caption: req.body.caption,
      tags: req.body.tags
    });

    const populatedPhoto = await photo.populate("attendee", "fullName nickname profileImageUrl");
    res.status(201).json({ data: populatedPhoto });
  } catch (error) {
    next(error);
  }
}

export async function likePhoto(req, res, next) {
  try {
    const liked = Boolean(req.body.liked);
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    photo.likes = liked ? photo.likes + 1 : Math.max(0, photo.likes - 1);
    await photo.save();

    res.json({ data: photo });
  } catch (error) {
    next(error);
  }
}

export async function deletePhoto(req, res, next) {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    res.json({ data: { id: req.params.id, deleted: true } });
  } catch (error) {
    next(error);
  }
}

export function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    return next(new Error("Invalid id"));
  }
  return next();
}
