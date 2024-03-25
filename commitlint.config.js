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
        'examples',
        'react-example',
        'vue-example',
        'vanilla-example',
        // Packages
        'core',
        'manapotion',
        'r3f',
        'react',
        'tailwind',
        'vanilla',
        'vue',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
}
