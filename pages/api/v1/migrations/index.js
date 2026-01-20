import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  if (request.method === "GET" || request.method === "POST") {
    const dbClient = await database.getNewClient();

    try {
      const migrations = await migrationRunner({
        dbClient: dbClient,
        dryRun: request.method === "GET",
        dir: resolve("infra", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
      });

      if (migrations.length > 0 && request.method === "POST") {
        return response.status(201).json({
          message:
            request.method === "POST"
              ? "Migrations applied"
              : "Pending migrations",
          migrations,
        });
      }

      return response.status(200).json({
        message: "No migrations to run",
        migrations,
      });
    } catch (error) {
      console.error("Migration error:", error);
      return response.status(500).json({ error: error.message });
    } finally {
      await dbClient.end();
    }
  }

  return response
    .status(405)
    .json({ error: `Method ${request.method} Not Allowed` });
}
