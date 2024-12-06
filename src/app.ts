import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";
import { logger } from "./middlewares/logger.middleware";
import { authorizeUser } from "./middlewares/authorization.middleware";

const app: Application = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", authorizeUser, postRoutes);
app.use(logger);

export default app;
