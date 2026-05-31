import mongoose from "mongoose";
import { Photo } from "../models/Photo.js";

export async function getPhotos(req, res, next) {
  try {
    const search = req.query.search?.trim();

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    const photos = await Photo.find(query)
      .sort({ createdAt: -1 });

    res.json({ data: photos });
  } catch (error) {
    next(error);
  }
}

export async function createPhoto(req, res, next) {
  try {
    const photo = await Photo.create({
      imageUrl: req.body.imageUrl,
      publicId: req.body.publicId,
      caption: req.body.caption,
      tags: req.body.tags || []
    });

    res.status(201).json({
      data: photo
    });
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

    photo.likes = liked
      ? photo.likes + 1
      : Math.max(0, photo.likes - 1);

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

    res.json({
      data: {
        id: photo._id,
        deleted: true
      }
    });
  } catch (error) {
    next(error);
  }
}

export function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid id"
    });
  }

  next();
}
