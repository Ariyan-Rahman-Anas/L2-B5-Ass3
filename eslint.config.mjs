import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const tsConfig = await tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json', // optional, but useful if using stricter rules
    },
  },
})

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  js.configs.recommended,
  ...tsConfig,
]