import { Router } from "express";
import {
  getPosts,
  getPost,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { postValidation } from "../utils/validation";

const router = Router();

router.get("/", getPosts);
router.get("/:id", validateRequest(postValidation.get), getPost);
router.get(
  "/author/:authorId",
  validateRequest(postValidation.authorGet),
  getPostsByAuthor
);
router.post("/new", validateRequest(postValidation.create), createPost);
router.patch("/:id", validateRequest(postValidation.update), updatePost);
router.delete("/:id", deletePost);

export default router;
