import { Router } from "express";
import { createPhoto, deletePhoto, getPhotos, likePhoto, validateObjectId } from "../controllers/photoController.js";
import { validatePhoto } from "../validators/photoValidator.js";

const router = Router();

router.get("/", getPhotos);
router.post("/", validatePhoto, createPhoto);
router.patch("/:id/like", validateObjectId, likePhoto);
router.delete("/:id", validateObjectId, deletePhoto);

export default router;
