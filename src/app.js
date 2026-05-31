import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import attendeeRoutes from "./routes/attendeeRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "memories-backend",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/attendees", attendeeRoutes);
app.use("/api/photos", photoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
