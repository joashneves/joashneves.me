/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// infra/migration/[timestamp]-seed-users.js
const bcrypt = require('bcrypt');  // Para criptografar a senha

exports.up = async (pgm) => {
    // Executando a seed para inserir o usuário
    const { seedUsers } = require('../seed/seed-users.js');
    const dbClient = await pgm.db;
    await seedUsers(dbClient);

};

exports.down = async (pgm) => {
  // Caso deseje remover os dados de seed durante o rollback
  await pgm.db.query('DELETE FROM users WHERE email = $1', ['user@example.com']);
};
