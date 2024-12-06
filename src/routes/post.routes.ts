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
import {
  authorizeOwner,
  authorizeUser,
} from "../middlewares/authorization.middleware";

const router = Router();

router.get("/", getPosts);
router.get("/:id", validateRequest(postValidation.get), getPost);
router.get(
  "/author/:authorId",
  validateRequest(postValidation.authorGet),
  getPostsByAuthor
);
router.post("/new", validateRequest(postValidation.create), createPost);
router.patch(
  "/:id",
  authorizeOwner,
  validateRequest(postValidation.update),
  updatePost
);
router.delete("/:id", authorizeOwner, deletePost);

export default router;
