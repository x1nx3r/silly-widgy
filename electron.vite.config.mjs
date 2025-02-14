import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: resolve('src/renderer/index.html'), // Main window
          settings: resolve('src/renderer/settings.html') // Settings window
        },
        output: {
          entryFileNames: '[name].bundle.js' // Generates main.bundle.js and settings.bundle.js
        }
      }
    }
  }
})
