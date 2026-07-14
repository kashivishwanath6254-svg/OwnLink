import express from "express";
import {
  createLink,
  getLink,
  listLinks,
  deleteLink,
  updateLink,
} from "../controllers/links.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  createLinkSchema,
  updateLinkSchema,
  slugParamSchema,
} from "../schemas/index.js";

const router = express.Router();

router.post("/", validate(createLinkSchema, "body"), createLink);
router.get("/", listLinks);
router.get("/:slug", validate(slugParamSchema, "params"), getLink);
router.delete("/:slug", validate(slugParamSchema, "params"), deleteLink);
router.patch(
  "/:slug",
  validate(slugParamSchema, "params"),
  validate(updateLinkSchema, "body"),
  updateLink,
);

export default router;
