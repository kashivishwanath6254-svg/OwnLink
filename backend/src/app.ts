import express from "express";
import healthRouter from "./routes/health.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

app.use("/api/health", healthRouter);
app.use("/", redirectRouter);

export default app;
