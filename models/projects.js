import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors";

async function createProjects(projectsInputValues) {
  const newProject = await runInsertQuary(projectsInputValues);
  return newProject;

  async function runInsertQuary(ProjectInputValues) {
    await validateBody(ProjectInputValues);
    await validateUniqueTitle(ProjectInputValues.title);
    console.log(ProjectInputValues);
    const result = await database.query({
      text: `INSERT INTO
      projects (title,
       description,
        links_proj,
         links_github,
          links_image)
      VALUES 
    ($1, $2, $3, $4, $5)
    RETURNING 
      *;
      `,
      values: [
        ProjectInputValues.title,
        ProjectInputValues.description,
        ProjectInputValues.links_proj,
        ProjectInputValues.links_github,
        ProjectInputValues.links_image,
      ],
    });
    return result.rows[0];
  }
}

async function findOneByProjectname(title) {
  const projectsFound = await runSelectQuery(title);

  return projectsFound;

  async function runSelectQuery(title) {
    const result = await database.query({
      text: `SELECT
       * 
      FROM
       projects 
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
     projects 
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

async function selectAllProject() {
  const result = await database.query({
    text: `SELECT
     *
    FROM
     projects 
    LIMIT
      10;`,
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

const projects = {
  createProjects,
  findOneByProjectname,
  selectAllProject,
};

export default projects;
