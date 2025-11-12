import styled from 'styled-components';

export const Root = styled.div`
    width: 580px;
    height: 375px;
    background-color: #fff;
    margin-left: 3%;
    border-radius: 12px;
`;

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    height: 10%; /* 타이틀 영역 높이 고정 */
`;

export const ListBox = styled.div`
    width: 100%;
    height: 85%; /* 나머지 높이 할당 */
    margin-top: 20px;

    /* 핵심: 내용이 넘치면 세로 스크롤 생성 */
    overflow-y: auto;

    /* 스크롤바 꾸미기 (선택사항) */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #d1d1d1;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export const List = styled.div`
    width: 100%;
    /* 높이를 % 대신 고정값(px)으로 주거나 min-height를 써야 스크롤될 때 안 찌그러집니다 */
    height: 50px;
    font-size: 1rem;
    font-weight: 400;

    /* 내부 아이템 가로 정렬 */
    display: flex;
    align-items: center;
    gap: 10px; /* 아이템 사이 간격 */

    border-bottom: 1px solid #f5f5f5; /* 구분선 추가 */
`;
