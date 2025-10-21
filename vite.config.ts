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
                // 실제 API 서버 주소
                target: 'https://apihub.kma.go.kr',
                // 출처(Origin) 헤더를 target 주소로 변경 (CORS 우회에 중요)
                changeOrigin: true,
                // 요청 경로에서 '/api' 부분을 제거하고 전달
                // HTTPS 연결 시 SSL 검증 무시 (필요한 경우)
                // secure: false,
            },
            // 만약 다른 API 프록시가 필요하면 여기에 추가
            // '/another-api': { ... }
        },
    },
});
