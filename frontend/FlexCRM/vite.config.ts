import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    base:'/',
    plugins: [react()],
    preview: {
        port: 5173,
        strictPort: true,
    },
    server: {
       port: 5173,
        strictPort: true,
       }
})
