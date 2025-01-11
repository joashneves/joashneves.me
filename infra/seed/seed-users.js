// infra/seed/seed-users.js
const bcrypt = require('bcrypt');  // Para criptografar a senha

const seedUsers = async (pgClient) => {
  const email = 'user@example.com';
  const password = 'securepassword';
  
  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserir o usuário na tabela users com a transação
  await pgClient.query(`
    INSERT INTO users (email, password, name)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING;
  `, [email, hashedPassword, 'User Example']);
};

module.exports = { seedUsers };
