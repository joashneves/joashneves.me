import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST to /api/v1/auth/login", () => {
  test("Successful login", async () => {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user@example.com",
        password: "securepassword",
      }),
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("sucess", true);
  });

  test("Invalid credentials", async () => {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user@example.com",
        password: "wrongpassword",
      }),
    });

    expect(response.status).toBe(401);
  });

});
