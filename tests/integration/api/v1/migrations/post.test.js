import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST /api/v1/migrations deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);

  const responseGet = await fetch("http://localhost:3000/api/v1/migrations");
  expect(responseGet.status).toBe(200);

  const responseGetBody = await responseGet.json();
  expect(Array.isArray(responseGetBody)).toBe(true);
  expect(responseGetBody.length).toBe(0);
  console.log(responseGetBody);
});
