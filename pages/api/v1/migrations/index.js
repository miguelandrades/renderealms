import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import controller from "infra/controller.js";

const defaultMigrationsOptions = {
  dryRun: false,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function getHandler(request, response) {
  const dbClient = await database.getNewClient();

  try {
    const migrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dbClient: dbClient,
      dryRun: true,
    });

    return response.status(200).json({
      message: "No migrations to run",
      migrations,
    });
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  const dbClient = await database.getNewClient();

  try {
    const migrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dbClient: dbClient,
    });

    if (migrations.length > 0) {
      return response.status(201).json({
        message: "Migrations applied",
        migrations,
      });
    }

    return response.status(200).json({
      message: "No migrations to run",
      migrations,
    });
  } finally {
    await dbClient.end();
  }
}

const router = createRouter();

router.get(getHandler);

router.post(postHandler);

export default router.handler(controller.errorHandlers);
