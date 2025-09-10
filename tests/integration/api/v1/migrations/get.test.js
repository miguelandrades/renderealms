import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("TRUNCATE TABLE pgmigrations RESTART IDENTITY CASCADE");
});

test("GET to api/v1/migrations Should Return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody.migrations)).toBe(true);
  expect(responseBody.migrations.length).toBeGreaterThan(0);
});
