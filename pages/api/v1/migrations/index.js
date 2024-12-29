import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOption = {
    databaseUrl: dbClient,
    dryRun: true,
    dir: join("infra", "migration"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOption);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }
  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOption,
      dryRun: false,
    });
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }
  return response.status(405).end();
}
