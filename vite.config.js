import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Publish this as https://YOUR_GITHUB_USERNAME.github.io (repository name must match).
export default defineConfig({ plugins: [react()], base: '/' });
