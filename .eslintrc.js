module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "no-console": "off",
    },
    ignorePatterns: [
        "*.d.ts",
        "*.query.ts",
        "*.mutation.ts",
        "*Query*",
        "*Mutation*",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
};
