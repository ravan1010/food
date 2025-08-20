import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://food-4zgz.onrender.com", // your backend
  //       // target:'http://localhost:5001',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
