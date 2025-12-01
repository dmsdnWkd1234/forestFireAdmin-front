import styled from 'styled-components';

interface ListIdProps {
    weight?: boolean;
}

export const root = styled.div`
    width: 100%;
    border-radius: 15px;
    padding: 40px;
    display: flex;
    justify-content: center;
    background-color: #f4f7fa;
    min-height: 100vh;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 20px 10px; /* 패딩 축소 */
    }
`;

export const showNoticeListRootBox = styled.section`
    width: 100%;
    max-width: 1200px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 32px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const ListPageHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h1 {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
        color: #333;
    }

    @media (max-width: 768px) {
        margin-bottom: 20px;
        h1 {
            font-size: 20px;
        }
    }
`;

// [수정] 헤더 박스: 95% 대신 100% 사용하고 padding 조정
export const listHeaderBox = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    background-color: #f8f9fa;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;

    @media (max-width: 768px) {
        display: none; // 모바일에서는 헤더 숨김
    }
`;

// [수정] 리스트 아이템 박스
export const listRootBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px 10px;
    border-bottom: 1px solid #eaedf1;
    transition: background-color 0.2s ease;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        background-color: #f8f9fa;
    }

    /* 모바일 스타일: 카드 형태로 변경 */
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 10px;
        gap: 8px;
        background-color: #fff;
    }
`;

// [공통] 셀 스타일
const baseCell = styled.div<ListIdProps>`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: ${(props) => (props.weight ? '#333' : '#555')};
    font-weight: ${(props) => (props.weight ? 700 : 400)};
    padding: 0 10px;
    box-sizing: border-box;

    /* 글자가 줄바꿈되어 찌그러지는 것 방지 */
    white-space: nowrap;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        font-size: 14px;
        white-space: normal; /* 모바일에서는 줄바꿈 허용 */
    }
`;

// 1. 번호 (고정 너비)
export const listId = styled(baseCell)`
    width: 80px;
    justify-content: center;
    flex-shrink: 0; // 공간 부족해도 줄어들지 않음

    @media (max-width: 768px) {
        display: none; // 모바일에서 번호 숨김
    }
`;

// 2. 카테고리 (고정 너비)
export const listType = styled(baseCell)`
    width: 120px;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: auto;
        justify-content: flex-start;
        font-size: 13px;
        color: #007bff; // 카테고리 강조색
        font-weight: 600;
        margin-bottom: 4px;
        background-color: #e7f1ff;
        padding: 4px 8px;
        border-radius: 4px;
    }
`;

// 3. 제목 (남은 공간 다 차지)
export const listTitle = styled(baseCell)`
    flex: 1; // 남은 공간 모두 차지
    justify-content: flex-start;

    /* 제목이 길어지면 말줄임표(...) 처리 */
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        font-size: 16px;
        font-weight: 700;
        color: #222;
        margin-bottom: 4px;
        display: block; // block으로 바꿔서 말줄임표 작동하게
    }
`;

// 4. 작성일 (고정 너비)
export const listDate = styled(baseCell)`
    width: 180px;
    justify-content: center;
    flex-shrink: 0;
    color: #888;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-start;
        font-size: 13px;
        color: #999;
    }
`;

export const addNoticeButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap; // 버튼 글자 줄바꿈 방지

    &:hover {
        background-color: #0056b3;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 6px;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
    min-width: 32px;
    height: 32px;
    padding: 0 6px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid ${(props) => (props.$isActive ? '#007bff' : '#ddd')};
    border-radius: 4px;
    cursor: pointer;
    background-color: ${(props) => (props.$isActive ? '#007bff' : '#fff')};
    color: ${(props) => (props.$isActive ? '#fff' : '#555')};
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: ${(props) => (props.$isActive ? '#0056b3' : '#f1f3f5')};
        border-color: ${(props) => (props.$isActive ? '#0056b3' : '#ccc')};
    }

    &:disabled {
        background-color: #f9f9f9;
        color: #ccc;
        cursor: not-allowed;
        border-color: #eee;
    }
`;
