import express from "express";
import {
  createTag,
  deleteTag,
  getTagById,
  getTagByName,
  getTagList,
  updateTag,
} from "../controllers/tag.controller";

const router = express.Router();

router.get("/", getTagList);

router.get("/:id", getTagById);

router.get("/nome/:nome", getTagByName)

router.post("/", createTag)

router.put("/:id", updateTag);

router.delete("/:id", deleteTag);

export default router;
