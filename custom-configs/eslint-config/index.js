module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/prettier',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'autofix',
    'unused-imports',
    'import',
  ],
  rules: {
    'no-shadow': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'autofix/no-debugger': 'error',
    'autofix/no-plusplus': 'error',
    'import/no-unresolved': 'off',
    'import/order': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'no-throw-literal': 'off',
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
};
