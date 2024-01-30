import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      views: "/src/views",
      routes: "/src/routes",
      context: "/src/context",
      google: "/src/google",
      types: "/src/types",
      app: "/src/app",
    },
  },
})