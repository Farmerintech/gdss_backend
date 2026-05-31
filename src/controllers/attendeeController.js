import mongoose from "mongoose";
import { Attendee } from "../models/Attendee.js";

export async function getAttendees(req, res, next) {
  try {
    const search = req.query.search?.trim();

    const query = search
      ? {
          fullName: {
            $regex: search,
            $options: "i"
          }
        }
      : {};

    const attendees = await Attendee.find(query)
      .sort({ fullName: 1 });

    res.json({ data: attendees });
  } catch (error) {
    next(error);
  }
}

export async function createAttendee(req, res, next) {
  try {
    const fullName = req.body.fullName?.trim();

    if (!fullName) {
      res.status(400);
      throw new Error("Full name is required");
    }

    const attendee = await Attendee.create({
      fullName,
      nickname: req.body.nickname,
      profileImageUrl: req.body.profileImageUrl
    });

    res.status(201).json({ data: attendee });
  } catch (error) {
    next(error);
  }
}

export async function getAttendeeById(req, res, next) {
  try {
    const attendee = await Attendee.findById(req.params.id);

    if (!attendee) {
      res.status(404);
      throw new Error("Attendee not found");
    }

    res.json({ data: attendee });
  } catch (error) {
    next(error);
  }
}

export async function updateAttendee(req, res, next) {
  try {
    const updateData = {};

    if (req.body.fullName !== undefined) {
      updateData.fullName = req.body.fullName.trim();
    }

    if (req.body.nickname !== undefined) {
      updateData.nickname = req.body.nickname;
    }

    if (req.body.profileImageUrl !== undefined) {
      updateData.profileImageUrl = req.body.profileImageUrl;
    }

    const attendee = await Attendee.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!attendee) {
      res.status(404);
      throw new Error("Attendee not found");
    }

    res.json({ data: attendee });
  } catch (error) {
    next(error);
  }
}

export async function deleteAttendee(req, res, next) {
  try {
    const attendee = await Attendee.findByIdAndDelete(req.params.id);

    if (!attendee) {
      res.status(404);
      throw new Error("Attendee not found");
    }

    res.json({
      data: {
        id: attendee._id,
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
      message: "Invalid attendee id"
    });
  }

  next();
}
