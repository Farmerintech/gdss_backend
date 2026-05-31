import { Router } from "express";
import { createAttendee, getAttendeeById, getAttendees } from "../controllers/attendeeController.js";
import { validateObjectId } from "../controllers/photoController.js";
import { validateAttendee } from "../validators/attendeeValidator.js";

const router = Router();

router.get("/", getAttendees);
router.post("/", validateAttendee, createAttendee);
router.get("/:id", validateObjectId, getAttendeeById);

export default router;
