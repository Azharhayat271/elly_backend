module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 35,
      lines: 50,
      statements: 50
    }
  },
  setupFiles: ['<rootDir>/jest.setup.js']
};
