import styled from 'styled-components';

export const Root = styled.div`
    width: 580px;
    height: 300px;
    background-color: #fff;
    margin-left: 3%;
    border-radius: 12px;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        width: 100%; /* 화면 꽉 채우기 */
        height: 250px; /* 높이 조절 (목록 길이에 따라 auto도 가능) */
        margin-left: 0;
        margin-top: 10px; /* 지도와 간격 띄우기 */
    }
`;

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        padding: 15px; /* 패딩 줄이기 */
    }
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    height: 10%;

    & > span {
        font-size: 0.9rem;
        margin-left: 10px;
        margin-top: 10px;
    }

    /* 모바일 대응 */
    @media (max-width: 768px) {
        font-size: 1.2rem; /* 폰트 줄이기 */
        & > span {
            font-size: 0.8rem;
            margin-top: 5px;
        }
    }
`;

export const ListBox = styled.div`
    width: 100%;
    height: 85%;
    margin-top: 20px;
    overflow-y: auto;

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

    /* 모바일 대응 */
    @media (max-width: 768px) {
        margin-top: 10px; /* 간격 줄이기 */
    }
`;

export const List = styled.div`
    width: 100%;
    height: 50px;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f5f5f5;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        height: 40px; /* 높이 줄이기 */
        font-size: 0.9rem; /* 폰트 줄이기 */
        gap: 5px; /* 간격 줄이기 */

        /* 모바일에서 텍스트가 잘릴 수 있으므로 스타일 조정 */
        & > span[style*='bold'] {
            flex-shrink: 0; /* 이름 줄어들지 않게 */
        }
        & > span[style*='color: #d32f2f'] {
            white-space: nowrap; /* 이슈 내용은 한 줄로 */
            overflow: hidden;
            text-overflow: ellipsis; /* 말줄임표 */
        }
    }
`;
