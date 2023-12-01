module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["nodemon.js"],
  extends: ["standard", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
