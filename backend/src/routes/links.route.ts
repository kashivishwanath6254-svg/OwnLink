import express from "express";
import {
  createLink,
  getLink,
  listLinks,
  deleteLink,
  updateLink,
} from "../controllers/links.controller.js";

const router = express.Router();

router.post("/", createLink);
router.get("/", listLinks);
router.get("/:slug", getLink);
router.delete("/:slug", deleteLink);
router.patch("/:slug", updateLink);

export default router;
