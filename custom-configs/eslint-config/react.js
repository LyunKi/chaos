module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    'react-app',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['autofix', 'unused-imports', 'import'],
  rules: {
    'autofix/no-debugger': 'error',
    'autofix/no-console': 'error',
    'autofix/no-plusplus': 'error',
    'import/no-unresolved': 'error',
    'import/order': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-named-as-default-member': 'off',
    'import/namespace': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
