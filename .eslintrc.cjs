module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    vi: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: require.resolve('@typescript-eslint/parser'),
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      files: ['vitest.setup.ts', '**/__tests__/*.{j,t}s', '**/tests/**/*.{spec,test}.{j,t}s'],
      env: {
        jest: true
      },
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'vitest/no-commented-out-tests': 'off'
      }
    }
  ]
}
