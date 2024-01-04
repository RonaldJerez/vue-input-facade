import { fileURLToPath } from 'url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'istanbul',
        reportOnFailure: true,
        reporter: ['html', 'lcov', 'text'],
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      },
      environment: 'jsdom',
      environmentOptions: {
        jsdom: {
          resources: 'usable'
        }
      },
      exclude: [...configDefaults.exclude, 'e2e/*'],
      globals: true,
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./vitest.setup.ts'],
      resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension
    }
  })
)
