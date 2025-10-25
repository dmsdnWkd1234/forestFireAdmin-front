import styled from 'styled-components';

export const Container = styled.div`
    /* max-width: 30vw;  => 이 부분은 전체 페이지 레이아웃에 따라 조정 필요합니다. */
    /* 현재는 컨텐츠 영역이 꽉 차도록 하거나, 고정된 최대 너비를 줄 수 있습니다. */
    width: 100%; /* 부모 컨테이너에 맞춰 너비 조정 */
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa; /* 배경색 추가 */
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

// 필터 버튼들을 담을 컨테이너
export const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    flex-wrap: wrap; /* 버튼이 많아지면 줄바꿈 처리 */
`;

// 필터 버튼 스타일
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
`;

// 테이블 컨테이너 추가 (오버플로우 처리용)
export const TableWrapper = styled.div`
    overflow-x: auto; /* 테이블이 넘칠 경우 스크롤바 생성 */
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
    margin-bottom: 20px;
`;

// 테이블 스타일
export const ReportTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* 테이블 최소 너비 설정, 스크롤바가 생길 수 있도록 */
`;

export const TableHeader = styled.th`
    background-color: #ecf0f1;
    color: #34495e;
    font-weight: 700;
    padding: 15px 20px;
    text-align: left;
    border-bottom: 2px solid #bdc3c7;
    font-size: 0.95em;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #fcfdfe; /* 짝수 행 배경색 */
    }
    &:hover {
        background-color: #f0f4f7; /* 호버 시 배경색 */
    }
`;

export const TableData = styled.td`
    padding: 15px 20px;
    border-bottom: 1px solid #eaeff3;
    color: #555;
    font-size: 0.9em;
`;

// 신고 유형을 시각적으로 강조하는 뱃지 스타일
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
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 10px;
`;

export const PageButton = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? '#3498db' : '#ecf0f1')};
    color: ${({ active }) => (active ? '#fff' : '#34495e')};
    border: 1px solid ${({ active }) => (active ? '#3498db' : '#bdc3c7')};
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s ease;
    min-width: 40px; /* 버튼 최소 너비 */

    &:hover {
        background-color: ${({ active }) => (active ? '#2980b9' : '#dcdfe1')};
        border-color: ${({ active }) => (active ? '#2980b9' : '#aeb7bd')};
        transform: translateY(-1px);
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;
