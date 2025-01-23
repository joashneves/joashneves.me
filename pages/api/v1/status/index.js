import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});
async function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}
function onErrorHandler(error, request, response) {
  console.log("\n Erro no /api/v1/status");
  const publicErrorObject = new InternalServerError({
    cause: error,
  });
  console.error(publicErrorObject);
  response.status(500).json({ publicErrorObject });
}
async function getHandler(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionDatabase = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnectionDatabaseValue = openedConnectionDatabase.rows[0].count;
  const versionDatabase = await database.query("SHOW server_version;");
  const versionDatabaseValue = versionDatabase.rows[0].server_version;

  const maxConnectionsDatabase = await database.query("SHOW max_connections;");
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
}
