import express from "express";
import healthRouter from "./routes/health.route.js";
import redirectRouter from "./routes/redirect.route.js";
import linksRouter from "./routes/links.route.js";

const app = express();
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/", redirectRouter);
app.use("/api/links", linksRouter);

export default app;
