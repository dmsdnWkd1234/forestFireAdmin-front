// WeatherCard.styles.js
import styled from 'styled-components';

// 날씨 정보의 메인 영역 (온도, 날씨 아이콘)
export const MainInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

// 현재 온도를 크게 표시
export const Temperature = styled.div`
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;

    span {
        font-size: 24px;
        vertical-align: super; // '°C' 단위를 위첨자로 표시
    }
`;

// 날씨 상태 아이콘
export const WeatherIcon = styled.div`
    font-size: 64px;
    color: #4299e1; // 포인트 컬러
`;

// 보조 정보들을 담을 그리드 컨테이너
export const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; // 2열 그리드
    gap: 16px; // 아이템 사이 간격
`;

// 개별 보조 정보 아이템
export const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

// 보조 정보 라벨 (예: '풍속')
export const DetailLabel = styled.span`
    font-size: 14px;
    color: #a0aec0; // 보조 텍스트 컬러
    display: flex;
    align-items: center;
    gap: 6px;
`;

// 보조 정보 값 (예: '3 m/s')
export const DetailValue = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #e2e8f0; // 기본 텍스트 컬러
`;

export const GlassCard = styled.div`
    /* 핵심 1: 반투명한 배경색 */
    width: 90%;
    background: rgba(45, 55, 72, 0.7); // 어두운 계열의 반투명 배경

    /* 핵심 2: 뒷 배경을 블러 처리하여 흐릿하게 만듦 */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); // Safari 브라우저 호환성

    /* 핵심 3: 빛나는 듯한 테두리 효과 */
    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 16px; // 둥근 모서리
    padding: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); // 입체감을 위한 그림자
`;

export const CardTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #ffffff; // 카드 제목은 더 밝은 흰색
    margin: 0 0 16px 0;
`;
