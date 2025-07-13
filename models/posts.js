import database from "infra/database";
import { ValidationError } from "infra/errors";

async function createPost(postInputValues) {
    
  const newPost = await runInsertQuary(postInputValues);
  return newPost;
  
  async function runInsertQuary(postInputValues) {
    await validateBody(postInputValues)
    await validateUniqueTitle(postInputValues.title);
    console.log(postInputValues)
    const result = await database.query({
      text: `INSERT INTO
      posts (title,
       description,
        links_proj,
         links_github,
          links_image)
      VALUES 
    ($1, $2, $3, $4, $5)
    RETURNING 
      *;
      `,
      values:[
        postInputValues.title,
        postInputValues.description,
        postInputValues.links_proj,
        postInputValues.links_github,
        postInputValues.links_image,
      ],
    });
    return result.rows[0];
  }
}

async function findOneBypostname(title) {
  const postFound = await runSelectQuery(title);

  return postFound;

  async function runSelectQuery(title) {
    const result = await database.query({
      text: `SELECT
       * 
      FROM
       posts 
      WHERE
        LOWER(title) = LOWER($1)
      LIMIT
        1;`,
      values: [title],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: "O title informado não foi encontrado no sistema",
        action: "Verifique se o title está digitado corretamente",
      });
    }
    return result.rows[0];
  }
}

async function validateUniqueTitle(title) {
  const result = await database.query({
    text: `SELECT
     title 
    FROM
     posts 
    WHERE
      LOWER(title) = LOWER($1)
    LIMIT
      1;`,
    values: [title],
  });
  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "title ja existe",
      action: "Escolha outro title",
    });
  }
  return result.rows[0];
}

async function selectAllPost() {
  const result =  await database.query({
    text: `SELECT
     *
    FROM
     posts 
    LIMIT
      10;`
  });
  return result.rows;
}


async function validateBody(body) {
  console.log("teste de validate Body : ", body);

  if (body === undefined || body === null) {
    throw new ValidationError({
      message: "Nada foi enviado",
      action: "Envie algo",
    });
  }

  const { title, description } = body;

  if (!title || !description) {
    throw new ValidationError({
      message: "Campos obrigatórios ausentes",
      action: "Inclua 'title' e 'description' no corpo da requisição",
    });
  }
}

const posts ={
  createPost,
  findOneBypostname,
  selectAllPost,
}

export default posts;