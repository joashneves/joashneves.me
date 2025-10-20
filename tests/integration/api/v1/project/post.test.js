import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST to /api/v1/project", () => {
  describe("Anonymous user", () => {
    describe("project new project", () => {
      test("success project", async () => {
        const response = await fetch("http://localhost:3000/api/v1/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Projeto Incrível",
            description: "Um projeto que muda o mundo.",
            links_proj: "https://meuprojeto.com",
            links_github: "https://github.com/meuuser/projeto",
            links_image: "https://imgur.com/minhaimagem.png",
          }),
        });

        expect(response.status).toBe(201);

        const responseBody = await response.json();
        expect(typeof responseBody).toBe("object");
        expect(responseBody).toHaveProperty("id");
        expect(responseBody).toHaveProperty("title", "Projeto Incrível");
      });
    });
  });
});
