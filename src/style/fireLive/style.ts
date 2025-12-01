import styled from 'styled-components';

// 전체 페이지 컨테이너
export const Root = styled.div`
    width: 90%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 40px 0;
`;

// [Layout] 좌우 2단 레이아웃 (PC: 좌우, 모바일: 상하)
export const LayoutContainer = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start; // 상단 정렬

    @media (max-width: 1024px) {
        flex-direction: column; // 화면 좁아지면 위아래로 배치
    }
`;

// [Left] 비디오 섹션 (스크롤 내려도 따라오도록 sticky 적용)
export const VideoSection = styled.section`
    flex: 1.2; // 좌측 비율 1.2
    position: sticky;
    top: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    box-sizing: border-box;
    min-width: 0;

    @media (max-width: 1024px) {
        width: 100%;
        position: static; // 모바일에서는 sticky 해제
        flex: none;
    }
`;

export const VideoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;

        &::before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            background-color: #ff3b30;
            border-radius: 50%;
            box-shadow: 0 0 8px #ff3b30;
        }
    }
`;

export const VideoWrapper = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9; // 16:9 비율 고정
    background-color: #000;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border: 1px solid #ddd;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

// [Right] 리스트 섹션
export const showNoticeListRootBox = styled.section`
    flex: 0.8; // 우측 비율 0.8
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    box-sizing: border-box;
    min-width: 0;

    @media (max-width: 1024px) {
        width: 100%;
        flex: none;
    }
`;

export const ListPageHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
    }
`;

export const addNoticeButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

// [Grid] 반응형 그리드
export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 기본 2열
    gap: 16px;
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;

    @media (max-width: 1400px) {
        // 우측 공간이 좁아지면 1열로 변경해도 좋음 (선택사항)
        // grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 1024px) {
        // 모바일 모드(상하 배치)로 바뀌면 공간이 넓어지므로 3~4열
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

// [Card] 감지 카드 스타일
export const DetectionCard = styled.article`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaedf1;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        border-color: #007bff;
    }
`;

export const CardImageWrapper = styled.div`
    width: 100%;
    height: 150px;
    background-color: #f4f7fa;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    ${DetectionCard}:hover & img {
        transform: scale(1.05);
    }
`;

export const StatusBadge = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 59, 48, 0.9);
    color: white;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    z-index: 1;
`;

export const CardHeader = styled.div`
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #555;

    span.label {
        font-weight: 600;
        color: #333;
    }
    span.value {
        font-family: 'Roboto', sans-serif;
        color: #777;
    }
`;

// [Pagination] 페이지네이션 스타일 (모바일 대응)
export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    gap: 6px;

    // [중요] 버튼이 많으면 다음 줄로 넘김
    flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
    padding: 0 12px;
    min-width: 36px;
    height: 36px; // 높이 고정
    font-size: 13px;
    font-weight: 600;

    border: 1px solid ${(props) => (props.$isActive ? '#007bff' : '#ddd')};
    border-radius: 6px;

    background-color: ${(props) => (props.$isActive ? '#007bff' : '#fff')};
    color: ${(props) => (props.$isActive ? '#fff' : '#555')};

    cursor: pointer;
    flex-shrink: 0; // 찌그러짐 방지
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: ${(props) => (props.$isActive ? '#0056b3' : '#f4f4f4')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: #f9f9f9;
    }

    // 모바일 미디어 쿼리
    @media (max-width: 480px) {
        padding: 0 8px;
        min-width: 30px;
        height: 32px;
        font-size: 12px;
    }
`;
