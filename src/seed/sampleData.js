import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Attendee } from "../models/Attendee.js";
import { Photo } from "../models/Photo.js";

const attendees = [
  { fullName: "John Doe", nickname: "JD" },
  { fullName: "Sarah Johnson", nickname: "Sage" },
  { fullName: "Michael Lee", nickname: "Mikey" },
  { fullName: "Emily Smith", nickname: "Em" },
  { fullName: "David Brown", nickname: "DB" }
];

const photos = [
  {
    uploaderName: "Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=82",
    publicId: "seed/memories-toast",
    caption: "A toast with friends",
    tags: ["toast", "friends"]
  },
  {
    uploaderName: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=82",
    publicId: "seed/memories-dance",
    caption: "Dance floor moment",
    tags: ["dance", "celebration"]
  }
];

async function seed() {
  await mongoose.connect(env.mongoUri);
  await Promise.all([Attendee.deleteMany({}), Photo.deleteMany({})]);
  const createdAttendees = await Attendee.insertMany(attendees);

  const attendeeByName = new Map(createdAttendees.map((attendee) => [attendee.fullName, attendee._id]));
  await Photo.insertMany(
    photos.map((photo) => ({
      ...photo,
      attendee: attendeeByName.get(photo.uploaderName)
    }))
  );

  await mongoose.disconnect();
  console.log("Sample Memories data seeded");
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
