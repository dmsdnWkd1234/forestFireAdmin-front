// main/style.ts
import styled from 'styled-components';

// 1. Root: 전체 레이아웃 수정
export const Root = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f2f2f7;

    /* --- 데스크탑 (기본) --- */
    flex-direction: row; // 가로 배치

    /* --- 모바일 (768px 이하) --- */
    @media (max-width: 768px) {
        flex-direction: column; // [핵심] 세로 배치로 변경
    }
`;

// 2. [추가] ContentWrapper: 사이드바를 제외한 메인 콘텐츠 영역
export const ContentWrapper = styled.div`
    @media (max-width: 768px) {
        flex: 1; // 남은 공간 모두 차지
        display: flex;
        align-items: flex-start; // 세로 상단 정렬 (공통)
        box-sizing: border-box;

        /* --- 데스크탑 (기본) --- */
        /* [핵심] 왼쪽 정렬 + 여백 */
        justify-content: flex-start;
        padding: 20px;
        margin-top: 20px; // 사이드바의 margin-top과 맞춤
        margin-right: 20px;

        /* --- 모바일 (768px 이하) --- */

        /* [핵심] 중앙 정렬 */
        justify-content: center;

        padding: 24px 16px; // 모바일 여백
        margin: -5%; // 세로 배치이므로 margin 리셋
        width: 100%; // 세로 배치 시 너비 100%
    }
`;
