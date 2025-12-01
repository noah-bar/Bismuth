import { configApp } from '@adonisjs/eslint-config'

export default [
  ...configApp(),
  {
    files: ['inertia/**/*'],
    rules: {
      '@unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
]
