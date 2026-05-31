import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

async function startServer() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Memories API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start Memories API", error);
    process.exit(1);
  }
}

startServer();
