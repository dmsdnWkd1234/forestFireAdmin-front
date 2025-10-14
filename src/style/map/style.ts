import styled from 'styled-components';

// 기존에 만들었던 ContentBox 재사용
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
