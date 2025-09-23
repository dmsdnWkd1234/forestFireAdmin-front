// styles.js (컴포넌트 스타일 파일)
import styled from 'styled-components';

export const GlassCard = styled.div`
    /* 핵심 1: 반투명한 배경색 */
    background: rgba(45, 55, 72, 0.7); // 어두운 계열의 반투명 배경

    /* 핵심 2: 뒷 배경을 블러 처리하여 흐릿하게 만듦 */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); // Safari 브라우저 호환성

    /* 핵심 3: 빛나는 듯한 테두리 효과 */
    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 16px; // 둥근 모서리
    padding: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); // 입체감을 위한 그림자
`;
