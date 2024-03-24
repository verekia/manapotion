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
        'vanilla-example',
        // Packages
        'browser',
        'core',
        'manapotion',
        'r3f',
        'react',
        'tailwind',
        'util',
        'vanilla',
        'vue',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
}
