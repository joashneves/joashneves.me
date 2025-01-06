import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/home", () => {
  test("Anonymous user", async () => {
    const response = await fetch("http://localhost:3000/api/v1/home");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
  });
});
