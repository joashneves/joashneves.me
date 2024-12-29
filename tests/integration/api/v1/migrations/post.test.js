import database from "infra/database";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST /api/v1/migrations deve retornar 200", async () => {
  const response = await fetch("http://26.137.54.75:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);

  const responseGet = await fetch("http://26.137.54.75:3000/api/v1/migrations");
  expect(responseGet.status).toBe(200);

  const responseGetBody = await responseGet.json();
  expect(Array.isArray(responseGetBody)).toBe(true);
  expect(responseGetBody.length).toBe(0);
  console.log(responseGetBody);
});
