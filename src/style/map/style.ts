import styled from 'styled-components';

// 기존에 만들었던 ContentBox 재사용

export const RootContainer = styled.div`
    display: flex;
    flex-direction: row-reverse; /* 기본(데스크톱)은 가로 정렬 */

    /* 768px 이하 모바일 화면일 때 */
    @media (max-width: 768px) {
        flex-direction: column; /* 세로 정렬로 변경 */
    }
`;

export const MapWrapper = styled.div`
    flex: 1; /* 데스크톱에서 남은 공간 모두 차지 */
    width: 100%; /* 너비를 100%로 설정 (flex-basis 대체) */

    @media (max-width: 768px) {
        width: 100%; /* 모바일에서 너비 100% */
        flex: 1; /* 세로로 쌓일 때 공간 차지 (필요시 높이 조절) */
    }
`;

export const ContentBox = styled.div`
    background-color: #ffffff;
    padding: 24px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

// 지도 카드 헤더
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

// 커스텀 정보창 스타일
export const CustomInfoWindow = styled.div`
    background: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    min-width: 220px;
    transform: translate(-50%, -120%); /* 마커 위에 위치하도록 조정 */
    position: relative;
    font-size: 0.9rem;

    h3 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        font-weight: 600;
    }

    p {
        margin: 5px 0;
    }

    button {
        /* 닫기 버튼 */
        position: absolute;
        top: 5px;
        right: 10px;
        border: none;
        background: transparent;
        font-size: 1.2rem;
        cursor: pointer;
        color: #888;
        &:hover {
            color: #000;
        }
    }
`;
