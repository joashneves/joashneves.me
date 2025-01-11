/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// infra/migration/1736570953215_create-users-table.js
exports.up = async (pgm) => {
  const dbClient = await pgm.db;
  await dbClient.query('BEGIN');  // Inicia a transação

  try {
    // Criação da tabela
    await pgm.createTable('users', {
      id: 'id',
      email: { type: 'varchar(255)', unique: true, notNull: true },
      password: { type: 'varchar(255)', notNull: true },
      name: { type: 'varchar(255)', notNull: true },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    });

    await dbClient.query('COMMIT');  // Comita a transação
  } catch (error) {
    await dbClient.query('ROLLBACK');  // Desfaz tudo se der erro
    throw error;
  }
};

exports.down = async (pgm) => {
  pgm.dropTable("users");
};

