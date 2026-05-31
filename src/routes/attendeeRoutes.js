import { Router } from "express";
import { createAttendee, getAttendeeById, getAttendees,  updateAttendee, deleteAttendee,} from "../controllers/attendeeController.js";
import { validateAttendee } from "../validators/attendeeValidator.js";

const router = Router();

router.get("/", getAttendees);
router.post("/", validateAttendee, createAttendee);
router.route("/:id")
  .get(validateObjectId, getAttendeeById)
  .put(validateObjectId, updateAttendee)
  .delete(validateObjectId, deleteAttendee);
export default router;
