import { Attendee } from "../models/Attendee.js";

export async function getAttendees(req, res, next) {
  try {
    const search = req.query.search?.trim();
    const query = search ? { fullName: { $regex: search, $options: "i" } } : {};

    const attendees = await Attendee.find(query)
      .sort({ fullName: 1 })
      .populate("uploadedPhotos")
      .lean({ virtuals: true });

    res.json({ data: attendees });
  } catch (error) {
    next(error);
  }
}

export async function createAttendee(req, res, next) {
  try {
    const fullName = req.body.fullName.trim();
    const attendee = await Attendee.findOneAndUpdate(
      { fullName: { $regex: `^${escapeRegExp(fullName)}$`, $options: "i" } },
      {
        $set: {
          fullName,
          nickname: req.body.nickname,
          profileImageUrl: req.body.profileImageUrl
        }
      },
      { new: true, runValidators: true, upsert: true }
    );

    res.status(201).json({ data: attendee });
  } catch (error) {
    next(error);
  }
}

export async function getAttendeeById(req, res, next) {
  try {
    const attendee = await Attendee.findById(req.params.id).populate("uploadedPhotos");
    if (!attendee) {
      res.status(404);
      throw new Error("Attendee not found");
    }

    res.json({ data: attendee });
  } catch (error) {
    next(error);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
