import express from "express";
import { redirectSlug } from "../controllers/redirect.controller.js";

const router = express.Router();

router.get("/:slug", redirectSlug);

export default router;
