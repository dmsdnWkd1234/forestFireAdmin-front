// glassmophism.ts
import styled from 'styled-components';

export const GlassCard = styled.div`
    /* 핵심 1: 반투명한 배경색 */
    background: rgba(45, 55, 72, 0.7);

    /* 핵심 2: 뒷 배경을 블러 처리 */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    /* 핵심 3: 빛나는 듯한 테두리 */
    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    /* --- 모바일 최적화 추가 --- */
    width: 100%;
    box-sizing: border-box; // padding이 width에 포함되도록

    /* 480px 이하의 모바일 화면 대응 */
    @media (max-width: 480px) {
        padding: 16px; // 모바일에서는 내부 여백을 줄임
    }
    /* --------------------- */
`;
