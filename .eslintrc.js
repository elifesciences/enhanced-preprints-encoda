module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', "no-only-tests"],
  extends: ["airbnb/base", "airbnb-typescript/base", "plugin:deprecation/recommended", "plugin:json/recommended"],
  rules: {
    "eol-last": ["error", "always"],
    "deprecation/deprecation": 1,
    "import/prefer-default-export": 0,
    "max-len": ["error", {
      "code": 240
    }],
    "import/extensions": 0,
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/*.test.ts"],
      "peerDependencies": true
    }],
    "operator-linebreak": 0,
    "no-only-tests/no-only-tests": ["error", {
      "focus": ["only"]
    }],
  }
};
