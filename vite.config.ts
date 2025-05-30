import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url))

import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts';
import pkg from "./package.json";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.build.json" }),
    react()
  ],
  build: {
    lib: {
      formats: ["es"],
      entry: resolve(__dirname, './lib/index.ts'),
    },
    rollupOptions: {
      // dependencies will be installed by the consumer,
      // so tell rollup not to bundle them with the package
      external: [
        ...Object.keys(pkg["dependencies"]     || {}),
        ...Object.keys(pkg["peerDependencies"] || {}),
        ...Object.keys(pkg["devDependencies"]  || {}),
      ],
    },
  }
})
