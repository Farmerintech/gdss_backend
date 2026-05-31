import { Router } from "express";
import { createAttendee, getAttendeeById, getAttendees,  updateAttendee, deleteAttendee,} from "../controllers/attendeeController.js";
import { validateAttendee } from "../validators/attendeeValidator.js";

const router = Router();

router.get("/", getAttendees);
router.post("/", validateAttendee, createAttendee);
router.route("/:id")
  .get(validateAttendee, getAttendeeById)
  .put(validateAttendee, updateAttendee)
  .delete(validateAttendee, deleteAttendee);
export default router;
