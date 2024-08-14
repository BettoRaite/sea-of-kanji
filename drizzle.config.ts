import { defineConfig } from "drizzle-kit";
import "dotenv/config";
const DB_URL = process.env.VITE_DB_URL;

export default defineConfig({
  schema: "./src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL ?? "",
  },
});
