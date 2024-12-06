import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import { logger } from "./middlewares/logger.middleware";

const app: Application = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(logger);

export default app;
