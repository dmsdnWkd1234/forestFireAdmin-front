import styled from 'styled-components';

export const Root = styled.div`
    width: 90%;
    max-width: 1600px; // 대시보드 형태라 조금 더 넓게 잡음
    margin: 0 auto; // 중앙 정렬
    padding: 40px 0;
`;

// [NEW] 좌우 배치를 위한 플렉스 컨테이너
export const LayoutContainer = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start; // 상단 기준 정렬

    // 화면이 줄어들면 위아래로 배치 (모바일/태블릿 대응)
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

// [NEW] 왼쪽: 실시간 영상 영역 (Sticky로 스크롤 내려도 따라오게 함)
export const VideoSection = styled.section`
    flex: 1.2; // 6:4 비율 중 6 차지
    position: sticky;
    top: 20px; // 스크롤 시 상단에 고정
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    box-sizing: border-box;
    min-width: 0; // 플렉스 내부 오버플로우 방지

    @media (max-width: 1024px) {
        width: 100%;
        position: static; // 모바일엔 고정 해제
        flex: none;
    }
`;

// [NEW] 비디오 헤더
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
            box-shadow: 0 0 8px #ff3b30; // 붉은색 빛나는 효과
        }
    }
`;

// [NEW] 실제 영상이 들어갈 박스 (16:9 비율 유지)
export const VideoWrapper = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9; // 16:9 비율 고정
    background-color: #000;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border: 1px solid #ddd;

    img,
    iframe {
        width: 100%;
        height: 100%;
        object-fit: contain; // 영상 비율 유지
    }
`;

// 오른쪽: 리스트 영역 (기존 showNoticeListRootBox 재활용하되 flex 속성 추가)
export const showNoticeListRootBox = styled.section`
    flex: 0.8; // 6:4 비율 중 4 차지
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

// [수정] GridContainer (오른쪽 좁은 영역에 맞게 컬럼 수 조정)
export const GridContainer = styled.div`
    display: grid;
    // 좁은 영역이므로 기본 2열로 시작
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;

    @media (max-width: 1400px) {
        // 화면이 아주 넓지 않으면 1열로 보여주는 게 가독성에 좋음 (선택사항)
        // grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 1024px) {
        // 모바일 모드로 바뀌면 다시 넓어지므로 3~4열 가능
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

// ... 나머지 기존 스타일 (DetectionCard, CardHeader 등)은 그대로 유지 ...
export const DetectionCard = styled.article`
    /* 기존 코드 유지 */
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

export const CardHeader = styled.div`
    padding: 12px; // 여백 약간 축소
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
    font-size: 13px; // 폰트 사이즈 살짝 축소
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

export const CardImageWrapper = styled.div`
    width: 100%;
    height: 150px; // 높이 살짝 축소
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

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    gap: 6px;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
    padding: 6px 12px; // 버튼 크기 조절
    min-width: 32px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid ${(props) => (props.$isActive ? '#007bff' : '#ddd')};
    border-radius: 6px;
    cursor: pointer;
    background-color: ${(props) => (props.$isActive ? '#007bff' : '#fff')};
    color: ${(props) => (props.$isActive ? '#fff' : '#555')};

    &:hover:not(:disabled) {
        background-color: ${(props) => (props.$isActive ? '#0056b3' : '#f4f4f4')};
    }
`;

export const ListPageHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        font-size: 22px; // 폰트 크기 조정
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
