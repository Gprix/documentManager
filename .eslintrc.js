module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    parser: "babel-eslint",
  },
  extends: ["next/core-web-vitals", "eslint:recommended", "prettier"],
  rules: {
    "import/no-duplicates": "off",
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling", "index"],
          ["object", "type"],
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
      },
    ],
  },
};
