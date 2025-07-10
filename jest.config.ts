export { };
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
    '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    ".(ts|tsx)": "babel-jest"
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx"
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1', 
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
}