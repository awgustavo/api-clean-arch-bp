module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:sonar/base",
      "plugin:sonar/recommended"
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["sonar","@typescript-eslint"],
    rules: {
      "sonar/deprecation": 1,
      "eol-last": 1,
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "no-trailing-spaces": "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  }