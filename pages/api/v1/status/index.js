import database from "infra/database.js";
import { InternalServerError } from "infra/errors.js";

async function status(request, response) {
  try {
    const databaseName = process.env.POSTGRES_DB;
    const openedConnectionDatabase = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const openedConnectionDatabaseValue =
      openedConnectionDatabase.rows[0].count;
    const versionDatabase = await database.query("SHOW server_version;");
    const versionDatabaseValue = versionDatabase.rows[0].server_version;

    const maxConnectionsDatabase = await database.query(
      "SHOW max_connections;",
    );
    const maxConnectionsDatabaseValue = parseInt(
      maxConnectionsDatabase.rows[0].max_connections,
    );

    const updatedAt = new Date().toISOString();
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: versionDatabaseValue,
          max_connections: maxConnectionsDatabaseValue,
          opened_connection: openedConnectionDatabaseValue,
        },
      },
    });
  } catch (error) {
    console.log("\n Erro no /api/v1/status");
    const publicErrorObject = new InternalServerError({
      cause: error,
    });
    console.error(publicErrorObject);
    response.status(500).json({ publicErrorObject });
  }
}

export default status;
