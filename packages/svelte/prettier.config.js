// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

export default {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-svelte'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^svelte$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^#/(.*)$',
    '',
    '<TYPES>',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
