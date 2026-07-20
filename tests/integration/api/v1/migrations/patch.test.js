import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PATCH api/v1/migrations", () => {
  describe("Anonymous User", () => {
    describe("Running Pending Migrations", () => {
      test("For the first time", async () => {
        const response = await fetch("http://localhost:3000/api/v1/status", {
          method: "PATCH",
        });

        const responseBody = await response.json();

        expect(response.status).toBe(405);
        expect(responseBody).toEqual({
          name: "MethodNotAllowedError",
          message: "Method Not Allowed",
          action: "Use the correct HTTP method for this endpoint.",
          statusCode: 405,
        });
      });
    });
  });
});
