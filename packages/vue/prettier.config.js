// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

export default {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^vue$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^#/(.*)$',
    '',
    '<TYPES>',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}
