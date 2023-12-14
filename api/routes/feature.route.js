import express from "express";
import { verifyToken, isAdmin } from "../middleware/jwt.js";
import { createFeature, deleteFeatureById, getAllFeatures, getFeatureById, updateFeatureById } from "../controllers/feature.controller.js";

const router = express.Router();

router.post("/", verifyToken, createFeature);
router.put("/", verifyToken, updateFeatureById);
router.get("/all", getAllFeatures);
router.get("/:id", verifyToken, getFeatureById);
router.delete("/:id", verifyToken, deleteFeatureById)

export default router;