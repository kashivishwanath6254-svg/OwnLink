import app from "./app.js";
import { verifyDatabaseConnection } from "./db/db.js";

const PORT = process.env.PORT || 3000;

verifyDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to PostgresSQL:", err);
  });
