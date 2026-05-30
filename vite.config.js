import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This preserves your '@/' imports so your current code doesn't break!
      '@': path.resolve(__dirname, './src'),
    },
  },
})
