import database from "infra/database"; // Conexão com o banco de dados
import { UnauthorizedError } from "infra/errors";
import bcrypt from "bcrypt"; // Usando bcrypt para comparar senhas

// Função para criar um novo usuário
export async function createUser({ email, password, name }) {
  const client = await database.getNewClient();

  try {
    // Verificar se o e-mail já existe
    const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
    const checkEmailValues = [email];
    const emailExists = await client.query(checkEmailQuery, checkEmailValues);

    if (emailExists.rows.length > 0) {
      throw new Error("Email já está em uso.");
    }

    // Hash a senha antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário no banco de dados
    const insertQuery = `
      INSERT INTO users (email, password, name) 
      VALUES ($1, $2, $3) 
      RETURNING id, email, name
    `;
    const insertValues = [email, hashedPassword, name];
    const result = await client.query(insertQuery, insertValues);

    return result.rows[0]; // Retorna o usuário criado
  } catch (error) {
    throw error;
  } finally {
    await client?.end();
  }
}

// Função para autenticar o usuário (login)
export async function authenticateUser({ email, password }) {
  const client = await database.getNewClient();

  try {
    // Buscar o usuário no banco
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new UnauthorizedError("Invalid Credentials.");
    }

    const user = result.rows[0];

    // Comparar a senha fornecida com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    // Retornar os dados do usuário ou um token JWT
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

// Função para recuperar um usuário pelo ID
export async function getUserById(userId) {
  const client = await database.getNewClient();

  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("User not found.");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

// Função para atualizar os dados do usuário
export async function updateUser(userId, { email, password, name }) {
  const client = await database.getNewClient();

  try {
    // Hash a senha, se fornecida
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateQuery = `
      UPDATE users 
      SET email = COALESCE($1, email), password = COALESCE($2, password), name = COALESCE($3, name) 
      WHERE id = $4 
      RETURNING id, email, name
    `;
    const updateValues = [email, hashedPassword, name, userId];
    const result = await client.query(updateQuery, updateValues);

    if (result.rows.length === 0) {
      throw new Error("User not found or failed to update.");
    }

    return result.rows[0]; // Retorna os dados atualizados
  } catch (error) {
    throw error;
  } finally {
    await client?.end();
  }
}
