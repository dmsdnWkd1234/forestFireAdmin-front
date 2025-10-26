import styled from 'styled-components';

export const Root = styled.div<{ active: string }>`
    /* 1. 기본 스타일 (데스크톱) */
    width: fit-content; /* 컨텐츠 크기에 맞춤 (기존 10vw보다 이게 우선됨) */
    height: 60vh; /* 데스크톱에선 세로로 길게 */
    display: flex;
    flex-direction: column; /* 데스크톱: 세로 정렬 */
    gap: 12px;
    padding: 10px 20px;
    margin-right: 25px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: ${({ active }) =>
        active == '전체' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

    /* * 2. 모바일 (768px 이하) 미디어 쿼리 
     */
    @media (max-width: 768px) {
        width: 100%; /* 모바일에선 가로로 꽉 참 */
        height: auto; /* 높이는 컨텐츠에 맞게 자동 조절 */
        flex-direction: row; /* 요청하신 대로 내부 요소 가로 정렬 */
        align-items: center; /* 가로 정렬 시 세로축 중앙 정렬 */

        /* * 가로 스크롤 (선택 사항): 
         * 내부 요소가 너무 많아 삐져나갈 경우를 대비 
         */
        overflow-x: auto;

        /* * width: 100%가 padding을 포함하도록 설정
         * (이전 단계에서 이미 추가했다면 생략 가능) 
         */
        box-sizing: border-box;
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

export const MeshDataTile = styled.button`
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 15px;
    color: #343a40;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #e9ecef;
        border-color: #ced4da;
    }

    &:active {
        background-color: #dee2e6;
        transform: scale(0.97);
    }
`;
