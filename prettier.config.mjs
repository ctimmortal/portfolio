/** @type {import('prettier').Options} */
export default {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  tabWidth: 2,
  bracketSameLine: true,
  jsxSingleQuote: false,
  printWidth: 88,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,

  plugins: ['prettier-plugin-packagejson'],

  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        parser: 'yaml',
        singleQuote: false,
        printWidth: 120,
      },
    },
    {
      files: ['*.json'],
      options: {
        singleQuote: false,
        printWidth: 120,
        trailingComma: 'none',
      },
    },
  ],
}
