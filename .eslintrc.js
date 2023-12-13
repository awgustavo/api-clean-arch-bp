module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "eol-last": 1,
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "no-trailing-spaces": "error",
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  }