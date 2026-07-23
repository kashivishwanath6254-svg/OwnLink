import express from "express";
import healthRouter from "./routes/health.route.js";
import redirectRouter from "./routes/redirect.route.js";
import linksRouter from "./routes/links.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import helmet from "helmet";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

//Routes
app.use("/api/health", healthRouter);
app.use("/", redirectRouter);
app.use("/api/links", linksRouter);

//Error handler
app.use(errorHandler);

export default app;
