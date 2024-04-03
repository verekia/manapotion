module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['example', 'core', 'manapotion', 'r3f', 'react', 'svelte', 'vanilla', 'vue'],
    ],
  },
}
