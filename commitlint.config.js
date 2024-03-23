module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        // General
        'global',
        'root',
        // Examples
        'react-example',
        'vue-example',
        // Packages
        'browser',
        'manapotion',
        'r3f',
        'react',
        'store',
        'tailwind',
        'util',
        'vue',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
}
