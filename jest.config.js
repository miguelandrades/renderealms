const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testTimeout: 60000,
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

module.exports = createJestConfig(customJestConfig);
