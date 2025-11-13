import styled from 'styled-components';

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
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
`;

export const CardTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
`;

export const CardData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline; /* 숫자와 단위를 바닥 기준으로 정렬 */
    color: #212529; /* 폰트 색상 (진한 회색/검정) */

    /* CardData 내부의 첫 번째 span (큰 숫자 "780") */
    & > span:first-child {
        font-size: 56px;
        font-weight: 700; /* 더 두껍게 */
    }

    /* CardData 내부의 두 번째 span (단위 "ppm") */
    & > span:last-child {
        font-size: 24px;
        font-weight: 500;
        margin-left: 8px; /* 숫자와 간격 띄우기 */
    }
`;
export const CardStatus = styled.div`
    display: flex;
    flex-direction: row;
`;

export const StatusBadge = styled.div`
    padding: 6px 12px;
    border-radius: 16px; /* 둥근 모서리 */
    font-size: 14px;
    font-weight: 600;
    color: #28a745; /* 녹색 텍스트 */
    background-color: #e6f7ec; /* 연한 녹색 배경 */
    margin-right: 8px; /* 뱃지 사이 간격 */

    /* 마지막 뱃지는 오른쪽 마진을 없앰 */
    &:last-child {
        margin-right: 0;
    }
`;
