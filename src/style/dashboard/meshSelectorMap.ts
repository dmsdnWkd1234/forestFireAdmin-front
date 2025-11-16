import styled from 'styled-components';

export const Root = styled.div`
    width: 50%;
    height: 275px;
    margin-left: 1%;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        width: 100%; /* 화면 꽉 채우기 */
        height: 300px; /* 모바일에선 지도를 좀 더 크게 */
        margin-left: 0;
        margin-top: 10px; /* DataCard와 간격 띄우기 */
    }
`;

export const MapTitle = styled.div`
    width: 100%;
    height: 25px;
    background-color: #fff;
    border-radius: 12px 12px 0px 0px;
    font-weight: 800;
    & > span {
        margin-left: 7px;
    }
`;
