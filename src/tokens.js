export default {
  '#': { pattern: /\d/ },
  X: { pattern: /[0-9a-z]/i },
  S: { pattern: /[a-z]/i },
  A: { pattern: /[a-z]/i, transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: /[a-z]/i, transform: (v) => v.toLocaleLowerCase() },
  '\\': { escape: true },
  '?': { optional: true }
}
