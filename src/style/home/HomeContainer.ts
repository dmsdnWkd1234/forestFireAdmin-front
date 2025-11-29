import styled from 'styled-components';

// 전체 페이지 래퍼
export const homeRoot = styled.div`
    width: 100%;
    max-width: 1400px; // 너무 넓게 퍼지지 않도록 최대 너비 제한
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 20px; /* 좌우 여백 추가 */
    box-sizing: border-box;
    gap: 32px; // 상단(날씨/영상)과 하단(공지/신고) 사이 간격
`;

// 가로 배치를 위한 로우(Row) 컨테이너
export const homeUnderRoot = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between; // 좌우 끝으로 배치하고 사이 여백 자동
    align-items: stretch; // 높이를 서로 맞춤 (가장 중요한 부분)
    gap: 24px; // 섹션 사이 간격 고정 (margin 대신 gap 사용)

    @media (max-width: 900px) {
        flex-direction: column; // 태블릿/모바일은 세로 배치
        height: auto;
    }
`;

// 개별 구역 (Weather, Video, Notice, Report)
export const Section = styled.div`
    flex: 1; // 1:1 비율로 공평하게 공간 차지
    width: 100%;
    min-width: 0; // Flex 자식의 overflow 방지
    display: flex;
    flex-direction: column;
`;

// ------------------------------------------------------------------
// [NEW] 공지사항 & 신고내역 컨테이너 (모던/블루 스타일)
// ------------------------------------------------------------------
export const Container = styled.div`
    width: 100%;
    height: 100%; // Section 높이에 꽉 차게
    min-height: 400px; // 최소 높이 보장
    padding: 24px;
    background-color: #fff;
    border-radius: 16px;
    // 부드러운 그림자
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaedf1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

// 섹션 제목 (파란 점 포인트 추가)
export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 20px 0;
    color: #111;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
        content: '';
        display: block;
        width: 6px;
        height: 20px;
        background-color: #007bff; // 파란색 바 포인트
        border-radius: 3px;
    }
`;

// 데이터 없을 때 메시지
export const EmptyMessage = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px dashed #ddd;
    margin-top: 10px;
    min-height: 200px;
`;

// 리스트 스크롤 영역
export const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1; // 남은 공간 채우기
    overflow-y: auto; // 내용 많으면 스크롤
    padding-right: 4px; // 스크롤바와 내용 겹침 방지

    // 스크롤바 커스텀
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #cbd5e0;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

// ------------------------------------------------------------------
// [NEW] 개별 카드 아이템 (실시간 감지 로그 스타일 적용)
// ------------------------------------------------------------------
export const Card = styled.div`
    background-color: #fff;
    border: 1px solid #eaedf1;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;

    // 호버 시 살짝 뜨면서 파란 테두리
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0, 123, 255, 0.1); // 파란 그림자
        border-color: #007bff;
    }

    // 왼쪽 파란 라인 포인트 (선택사항)
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #007bff;
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover::after {
        opacity: 1;
    }
`;

// 카드 내부 텍스트 필드
export const Field = styled.div`
    margin-bottom: 6px;
    font-size: 15px;
    color: #555;
    display: flex;
    justify-content: space-between; // 라벨과 값 양끝 정렬
    align-items: center;

    &:last-child {
        margin-bottom: 0;
    }

    strong {
        font-weight: 600;
        color: #2d3748;
        font-size: 14px;
    }

    span {
        color: #718096;
        font-size: 14px;
    }
`;

// ------------------------------------------------------------------
// CCTV 비디오 컨테이너 (GlassCard와 높이 맞춤)
// ------------------------------------------------------------------
export const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 360px; // GlassCard와 높이 균형
    background-color: #fff;
    border-radius: 20px; // GlassCard와 비슷한 둥글기
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); // 약간 깊이감 있는 그림자
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const VideoWrapper = styled.div`
    flex: 1;
    width: 100%;
    background-color: #000;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const RecBadge = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-weight: 700;
    font-size: 14px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 4px;

    &::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: #ff3b30;
        border-radius: 50%;
        box-shadow: 0 0 10px #ff3b30;
        animation: blink 1.5s infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            opacity: 1;
        }
    }
`;
