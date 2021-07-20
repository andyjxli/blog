module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    JSX: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-var-requires': 'off',
    'arrow-parens': ['error', 'always'], // prettier conflict
    'function-paren-newline': 'off', // prettier conflict
    'import/order': 'error',
    // 'operator-linebreak': 'off', // prettier conflict
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'off',
      { allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    camelcase: ['off'],
  },
};
