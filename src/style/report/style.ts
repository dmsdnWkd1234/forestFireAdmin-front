import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
`;

export const Title = styled.h2`
    margin-bottom: 25px;
    color: #2c3e50;
    font-size: 1.8em;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 15px;

    @media (max-width: 480px) {
        font-size: 1.5em;
    }
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-size: 1.1em;
    padding: 50px 0;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
`;

export const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean; typeColor: string }>`
    background-color: ${({ active, typeColor }) => (active ? typeColor : '#ecf0f1')};
    color: ${({ active }) => (active ? '#ffffff' : '#34495e')};
    border: 1px solid ${({ active, typeColor }) => (active ? typeColor : '#bdc3c7')};
    padding: 10px 18px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 0.95em;

    &:hover {
        background-color: ${({ active, typeColor }) => (active ? typeColor : '#dcdfe1')};
        border-color: ${({ active, typeColor }) => (active ? typeColor : '#aeb7bd')};
        transform: translateY(-1px);
    }

    @media (max-width: 480px) {
        padding: 8px 12px;
        font-size: 0.85em;
    }
`;

export const TableWrapper = styled.div`
    overflow-x: auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
    margin-bottom: 20px;
`;

export const ReportTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
`;

export const TableHeader = styled.th`
    background-color: #f9fafb;
    color: #34495e;
    font-weight: 700;
    padding: 15px 20px;
    text-align: center;
    font-size: 0.95em;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #fcfdfe;
    }
    &:hover {
        background-color: #f0f4f7;
    }
`;

export const TableData = styled.td`
    padding: 15px 20px;
    border-bottom: 1px solid #eaeff3;
    color: #555;
    font-size: 0.9em;
    text-align: center;
`;

export const TypeBadge = styled.span<{ typeColor: string }>`
    display: inline-block;
    padding: 6px 12px;
    border-radius: 15px;
    background-color: ${({ typeColor }) => typeColor};
    color: #ffffff;
    font-weight: 600;
    font-size: 0.85em;
    text-transform: capitalize;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    white-space: nowrap; // 배지 줄바꿈 방지
`;

// [수정] 페이지네이션 컨테이너
export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 8px; // 간격 약간 축소

    // [핵심] 공간 부족하면 줄바꿈
    flex-wrap: wrap;
`;

// [수정] 페이지 버튼
export const PageButton = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
    color: ${({ active }) => (active ? '#fff' : '#34495e')};
    border: 1px solid ${({ active }) => (active ? '#007bff' : '#bdc3c7')};

    padding: 8px 12px; // 패딩 축소 (모바일 대응)
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s ease;
    min-width: 36px; // 최소 너비 축소
    height: 36px; // 높이 고정 (줄바꿈 시 일정하게)

    // 플렉스 아이템 찌그러짐 방지
    flex-shrink: 0;

    &:hover {
        background-color: ${({ active }) => (active ? '#0056b3' : '#dcdfe1')};
        border-color: ${({ active }) => (active ? '#0056b3' : '#aeb7bd')};
        transform: translateY(-1px);
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        background-color: #f9f9f9;
    }

    // 모바일 미디어 쿼리 추가
    @media (max-width: 480px) {
        padding: 6px 10px;
        min-width: 32px;
        height: 32px;
        font-size: 0.8em;
    }
`;
