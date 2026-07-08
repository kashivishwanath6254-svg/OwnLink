import app from "./app.js";
import { verifyDatabaseConnection } from "./db/db.js";
import { config } from "./config.js";

const PORT = config.port;

verifyDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to PostgresSQL:", err);
  });
