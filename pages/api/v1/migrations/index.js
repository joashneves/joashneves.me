import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      databaseUrl: dbClient,
      dryRun: true,
      dir: resolve("infra", "migration"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migrationsExecuted = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      // Verifica se a migração '1736570953215_create-users-table' foi executada
      if (!migrationsExecuted.includes('1736570953215_create-users-table')) {
        return response.status(400).json({
          error: 'A migração de criação da tabela "users" não foi executada.',
        });
      }

      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }

  } catch (error) {
    console.error(error);

    return response.status(500).json({
      error: 'Erro ao rodar migrações',
      details: error.message,
    });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
