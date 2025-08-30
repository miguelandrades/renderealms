import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("TRUNCATE TABLE pgmigrations RESTART IDENTITY CASCADE");
}

test("POST to api/v1/migrations Should Return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response1Body = await response1.json();

  expect(response1.status).toBe(201);
  expect(Array.isArray(response1Body.migrations)).toBe(true);
  expect(response1Body.migrations.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response2Body = await response2.json();

  expect(response2.status).toBe(200);
  expect(Array.isArray(response2Body.migrations)).toBe(true);
  expect(response2Body.migrations.length).toBe(0);
});
