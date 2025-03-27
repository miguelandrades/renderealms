import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (request.method === "GET" || request.method === "POST") {
    try {
      const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL,
        dryRun: request.method === "GET",
        dir: join("infra", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
      });

      return response.status(200).json(migrations);
    } catch (error) {
      console.error("Migration error:", error);
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: "Method Not Allowed" });
}
