import express from "express";
import { redirectSlug } from "../controllers/redirect.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { slugParamSchema } from "../schemas/slugParam.Schema.js";

const router = express.Router();

router.get("/:slug", validate(slugParamSchema, "params"), redirectSlug);

export default router;
