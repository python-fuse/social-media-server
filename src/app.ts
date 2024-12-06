import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";

import userRoutes from "./routes/user.routes";
import { logger } from "./middlewares/logger.middleware";

const app: Application = express();

app.use(express.json());
app.use(logger);
app.use("/api/users", userRoutes);

export default app;
