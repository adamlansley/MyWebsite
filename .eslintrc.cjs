/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  rules: {
    semi: "error",
    quotes: "error",
    "no-console": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/no-explicit-any": "off"
  },
  overrides: [
    {
      files: [
        "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"
      ],
      extends: [
        "plugin:cypress/recommended"
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  }
};
