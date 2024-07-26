module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }]
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    globalSetup: './jest.global-setup.js',
    globalTeardown: './jest.global-teardown.js'
};
