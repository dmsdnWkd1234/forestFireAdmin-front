import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // 모든 IP에서 접근 가능
        port: 3000, // 사용할 포트 번호
        proxy: {
            // '/api' 경로로 시작하는 요청을 프록시 처리
            '/api': {
                target: 'https://apihub.kma.go.kr/api', // /api 경로 포함
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // 요청 시 /api 제거
            },
            // 만약 다른 API 프록시가 필요하면 여기에 추가
            // '/another-api': { ... }
        },
    },
});
