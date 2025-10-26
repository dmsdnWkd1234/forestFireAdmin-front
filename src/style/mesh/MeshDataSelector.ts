import styled from 'styled-components';

export const Root = styled.div<{ active: string }>`
    /* ... (1. 기본 스타일 (데스크톱)은 그대로) ... */
    width: fit-content;
    height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px 20px;
    margin-right: 25px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: ${({ active }) =>
        active == '기본' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

    /* * 2. 모바일 (768px 이하) 미디어 쿼리 
     */
    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        flex-direction: row;

        /* ▼▼▼ 여기가 수정되었습니다 ▼▼▼ */

        /* 1. (기존) overflow-x: auto; -> (변경) flex-wrap: wrap; */
        /* overflow-x: auto; */ /* <- 이 줄을 삭제하거나 주석 처리 */
        flex-wrap: wrap; /* <- 이 줄을 추가 (줄바꿈 허용) */

        /* 2. (선택) 버튼들을 보기 좋게 중앙 정렬 */
        justify-content: center;

        /* (기존) align-items: center; -> 유지 (세로축 중앙 정렬) */
        align-items: center;

        box-sizing: border-box;

        margin-top: -20px;
    }
`;

export const MobileArray = styled.div`
    display: flex;
    flex-direction: row;
`;

export const MobileArraySection = styled.div`
    display: flex;
    flex-direction: column;
`;

// ... (S.Root 스타일은 그대로) ...

// active prop을 받도록 수정
export const MeshDataTile = styled.button<{ active?: boolean }>`
    background-color: ${({ active }) => (active ? '#3498db' : '#ffffff')}; // 활성/비활성 색상
    color: ${({ active }) => (active ? '#ffffff' : '#343a40')};
    border: 1px solid ${({ active }) => (active ? '#3498db' : '#dee2e6')};
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 15px;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')}; // 활성 폰트
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ active }) => (active ? '#2980b9' : '#e9ecef')};
        border-color: ${({ active }) => (active ? '#2980b9' : '#ced4da')};
    }

    &:active {
        background-color: #dee2e6;
        transform: scale(0.97);
    }
`;
