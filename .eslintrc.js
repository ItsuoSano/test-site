module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
        allowFirstLine: true
      },
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }]
  }
}
