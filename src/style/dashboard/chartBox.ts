import styled from 'styled-components';

export const Root = styled.div`
    width: 50%;
    height: 400px;
    margin-left: 1%;
    margin-top: 3%;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 살짝 그림자 추가 */
`;

export const ChartBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

// 타이틀과 버튼을 가로로 배치하기 위한 헤더
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    position: relative; /* 드롭다운 메뉴의 기준점 */
    margin-bottom: 10px;
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    color: #333;
`;

// + 버튼 스타일
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

// 드롭다운 메뉴 박스
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

// 드롭다운 메뉴 아이템
export const OptionItem = styled.div`
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    color: #555;

    &:hover {
        background-color: #f8f9fa;
        color: #28a745; /* 선택 시 녹색 포인트 */
    }
`;

// 차트가 들어갈 영역 (나머지 높이 꽉 채움)
export const ChartArea = styled.div`
    flex: 1;
    width: 100%;
    min-height: 0; /* flex 자식의 overflow 방지 */
`;
