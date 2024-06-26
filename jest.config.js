module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/test/**/*.test.(ts|js)"],
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["node_modules/*"],
    modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/src/utils/"],
};
