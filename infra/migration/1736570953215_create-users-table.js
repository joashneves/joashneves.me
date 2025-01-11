/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// infra/migration/[timestamp]-create-users-table.js
exports.up = async (pgm) => {
  // Criação da tabela
  pgm.createTable('users', {
    id: 'id',
    email: { type: 'varchar(255)', unique: true, notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    name: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};


exports.down = async (pgm) => {
  pgm.dropTable('users');
};
