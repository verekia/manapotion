module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'global',
        'root',
        'example',
        'core',
        'manapotion',
        'r3f',
        'react',
        'tailwind',
        'vanilla',
        'vue',
      ],
    ],
  },
}
