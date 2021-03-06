module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['webpack.config.js'],
  rules: {
    'no-unused-vars': 'warn',
  },
};
