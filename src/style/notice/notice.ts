import styled from 'styled-components';

interface ListIdProps {
    weight?: boolean;
}

export const root = styled.div`
    width: 100%;
    padding: 40px;
    display: flex;
    justify-content: center;
    background-color: #f4f7fa;
    min-height: 100vh;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 20px 16px;
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
        font-size: 28px;
        font-weight: 600;
        margin: 0;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 20px;

        h1 {
            font-size: 24px;
        }
    }
`;

export const listHeaderBox = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 20px;
    background-color: #f9fafb;
    border-bottom: 1px solid #eaedf1;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    @media (max-width: 768px) {
        display: none; // 모바일에서 헤더 숨김
    }
`;

export const listRootBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 20px;
    border-bottom: 1px solid #eaedf1;
    transition: background-color 0.2s ease;
    cursor: pointer;

    &:hover {
        background-color: #f2f2f2;
    }

    &:last-child {
        border-bottom: none;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    @media (max-width: 768px) {
        flex-direction: column; // 세로 배치
        gap: 8px; // 아이템 간 간격
        padding: 16px;
        align-items: flex-start; // 왼쪽 정렬
    }
`;

const baseCell = styled.section<ListIdProps>`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: ${(props) => (props.weight ? '#333' : '#555')};
    font-weight: ${(props) => (props.weight ? 600 : 400)};
    padding: 0 8px;

    @media (max-width: 768px) {
        width: 100%; // 모바일에선 100%
        padding: 2px 0;
        font-size: 14px;
        font-weight: 400;
        color: #555;
    }
`;

export const listId = styled(baseCell)`
    width: 10%;
    justify-content: center;
    @media (max-width: 768px) {
        display: none; // 모바일에선 번호 숨김
    }
`;

export const listType = styled(baseCell)`
    width: 15%;
    justify-content: center;
    @media (max-width: 768px) {
        justify-content: flex-start;
        font-size: 13px;
        color: #777;

        // 모바일용 레이블 추가
        &::before {
            content: '카테고리: ';
            font-weight: 500;
            margin-right: 6px;
            color: #555;
        }
    }
`;

export const listTitle = styled(baseCell)`
    width: 45%;
    justify-content: flex-start;
    @media (max-width: 768px) {
        font-size: 16px; // 제목은 조금 크게
        font-weight: 600; // 굵게
        color: #333;
        order: -1; // 맨 위로
    }
`;

export const listDate = styled(baseCell)`
    width: 30%;
    justify-content: center;
    color: ${(props) => (props.weight ? '#333' : '#777')};
    @media (max-width: 768px) {
        justify-content: flex-start;
        font-size: 13px;
        color: #777;

        &::before {
            content: '작성일: ';
            font-weight: 500;
            margin-right: 6px;
            color: #555;
        }
    }
`;

export const addNoticeButton = styled.button`
    padding: 10px 18px;
    font-size: 15px;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const createNoticeLink = styled.a`
    text-decoration: none;
    color: inherit;
    display: block;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px; // 목록 카드와 간격
    gap: 8px;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
    padding: 8px 14px;
    min-width: 40px; // 최소 너비
    font-size: 14px;
    font-weight: 600;
    border: 1px solid ${(props) => (props.$isActive ? '#007bff' : '#ddd')};
    border-radius: 6px;
    cursor: pointer;
    background-color: ${(props) => (props.$isActive ? '#007bff' : '#fff')};
    color: ${(props) => (props.$isActive ? '#fff' : '#555')};
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: ${(props) => (props.$isActive ? '#0056b3' : '#f4f4f4')};
        border-color: ${(props) => (props.$isActive ? '#0056b3' : '#ccc')};
    }

    &:disabled {
        background-color: #f9f9f9;
        color: #ccc;
        cursor: not-allowed;
        border-color: #eee;
    }
`;
