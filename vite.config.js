import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Barcha tarmoqdan kirishni yoqish
    port: 5173,       // (Optional) Agar kerak bo'lsa portni o'zgartiring
  },

})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       input: {
//         main: './index.html'
//       }
//     }
//   },
//   publicDir: 'public'
// });

