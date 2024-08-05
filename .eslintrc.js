module.exports = {
   env: {
     browser: true,
     es2021: true,
   },
   extends: [
     'plugin:react/recommended',
     'plugin:@typescript-eslint/recommended',
     'plugin:prettier/recommended',
     'prettier',
     'prettier/@typescript-eslint',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
     ecmaFeatures: {
       jsx: true,
     },
     ecmaVersion: 12,
     sourceType: 'module',
   },
   plugins: [
     'react',
     '@typescript-eslint',
     'react-hooks',
     'import',
     'jsx-a11y',
     'prettier',
   ],
   rules: {
     'prettier/prettier': ['error', { endOfLine: 'auto' }],
     'react/react-in-jsx-scope': 'off',
     'react/jsx-filename-extension': [
       1,
       { extensions: ['.tsx', '.jsx'] },
     ],
     '@typescript-eslint/explicit-module-boundary-types': 'off',
     '@typescript-eslint/no-unused-vars': ['error'],
     'react/jsx-uses-react': 'off',
     'react/jsx-uses-vars': 'error',
     'react/prop-types': 'off',
     'import/prefer-default-export': 'off',
     'react/jsx-props-no-spreading': 'off',
     'react-hooks/rules-of-hooks': 'error',
     'react-hooks/exhaustive-deps': 'warn',
     'no-use-before-define': 'off',
     '@typescript-eslint/no-use-before-define': ['error'],
     
   },
   settings: {
     react: {
       version: 'detect',
     },
   },
 };
 