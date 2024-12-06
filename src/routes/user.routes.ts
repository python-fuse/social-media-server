import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { userValidation } from "../utils/validation";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateRequest(userValidation.get), getUser);
router.post("/new", validateRequest(userValidation.create), createUser);
router.patch("/:id", validateRequest(userValidation.update), updateUser);
router.delete("/:id", validateRequest(userValidation.get), deleteUser);

export default router;
