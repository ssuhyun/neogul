import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🔍 상대 경로로 지정하여 /neogul/lee/든 /neogul/kim/이든 
  // 어떤 하위 폴더 경로에서 실행되어도 자원을 올바르게 불러오도록 만듭니다.
  base: './', 
  build: {
    // 기본 빌드 폴더명을 유지합니다.
    outDir: 'dist',
  }
})