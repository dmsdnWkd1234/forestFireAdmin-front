import styled from 'styled-components';

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        flex-wrap: wrap; /* 2x2 그리드를 위해 줄바꿈 허용 */
        justify-content: space-around; /* 카드 사이 간격 자동 배분 */
        height: auto; /* 내용물에 맞게 높이 자동 조절 */
        padding: 10px 0; /* 상하 여백 */
    }
`;

export const CardRoot = styled.div`
    width: 20%;
    height: 50%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 35px;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        width: 42%; /* 한 줄에 2개 (좌우 마진 포함) */
        height: auto; /* 높이 자동 */
        min-height: 120px; /* 최소 높이 */
        padding: 15px; /* 패딩 줄이기 */
        margin: 5px; /* 마진 줄이기 */
    }
`;

export const CardTitle = styled.div`
    font-weight: 500;
    font-size: 25px;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        font-size: 1rem; /* 16px */
    }
`;

export const CardData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: #212529;

    & > span:first-child {
        font-size: 56px;
        font-weight: 700;
    }

    & > span:last-child {
        font-size: 24px;
        font-weight: 500;
        margin-left: 8px;
    }

    /* 모바일 대응 */
    @media (max-width: 768px) {
        & > span:first-child {
            font-size: 2.2rem; /* 36px */
        }
        & > span:last-child {
            font-size: 1rem; /* 16px */
        }
    }
`;
export const CardStatus = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: auto; /* 모바일에서 높이가 auto일 때 뱃지를 아래로 밀기 */
`;

export const StatusBadge = styled.div`
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #28a745;
    background-color: #e6f7ec;
    margin-right: 8px;

    &:last-child {
        margin-right: 0;
    }

    /* 모바일 대응 */
    @media (max-width: 768px) {
        font-size: 12px;
        padding: 4px 8px;
    }
`;
