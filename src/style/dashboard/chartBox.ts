import styled from 'styled-components';

export const Root = styled.div`
    width: 50%;
    height: 400px;
    margin-left: 1%;
    margin-top: 3%;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    /* 모바일 대응 */
    @media (max-width: 768px) {
        width: 100%; /* 화면 꽉 채우기 */
        height: 350px; /* 높이 조절 */
        margin-left: 0;
        margin-top: 10px; /* 위 컴포넌트와 간격 */
    }
`;

export const ChartBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        padding: 15px 20px; /* 패딩 줄이기 */
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    position: relative;
    margin-bottom: 10px;
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    color: #333;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        font-size: 1.2rem; /* 폰트 줄이기 */
    }
`;

export const SelectButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: #f0f0f0;
    color: #555;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background-color: #e0e0e0;
        color: #000;
    }
`;

export const OptionList = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
    overflow: hidden;
    width: 120px;
`;

export const OptionItem = styled.div`
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    color: #555;

    &:hover {
        background-color: #f8f9fa;
        color: #28a745;
    }
`;

export const ChartArea = styled.div`
    flex: 1;
    width: 100%;
    min-height: 0;
`;
