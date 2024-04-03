// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
// https://github.com/fabiospampinato/noop-tag
const html = (strings: TemplateStringsArray, ...expressions: unknown[]): string => {
  let result = strings[0]

  for (let i = 1, l = strings.length; i < l; i++) {
    result += expressions[i - 1]
    result += strings[i]
  }

  return result
}

export default html
