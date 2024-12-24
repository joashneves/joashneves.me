test("GET /api/v1/status deve retornar 200", async () =>{
  const response = await fetch("http://26.137.54.75:3000/api/v1/status");
  expect(response.status).toBe(200);
});