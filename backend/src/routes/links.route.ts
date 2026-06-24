import express from "express";
import {
  createLink,
  getLink,
  listLinks,
} from "../controllers/links.controller.js";

const router = express.Router();

router.post("/", createLink);
router.get("/", listLinks);
router.get("/:slug", getLink);

export default router;
