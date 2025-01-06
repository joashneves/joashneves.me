import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/home", () => {
  test("Anonymous user", async () => {
    const response = await fetch("http://localhost:3000/api/v1/home", {
      method: "POST",
    });
    expect(response.status).toBe(404);
  });
});
