// WeatherCard.styles.js
import styled from 'styled-components';
// 1. 다른 파일에서 컴포넌트 가져오기
import { GlassCard as BaseGlassCard } from './Glassmorphism .ts';
import { CardTitle as BaseCardTitle } from './Text.ts';

// 2. 중복 정의된 GlassCard, CardTitle 삭제
//    대신 Base 컴포넌트를 확장(extend)하거나 그대로 사용합니다.
//    여기서는 이름을 그대로 사용하기 위해 Base 컴포넌트를 import 합니다.
export const GlassCard = BaseGlassCard;
export const CardTitle = BaseCardTitle;

// 날씨 정보의 메인 영역 (온도, 날씨 아이콘)
export const MainInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    /* --- 모바일 최적화 (480px 이하) --- */
    @media (max-width: 480px) {
        flex-direction: column; // 세로로 쌓기
        align-items: center; // 중앙 정렬
        gap: 16px;
    }
    /* ------------------------------ */
`;

// 현재 온도를 크게 표시
export const Temperature = styled.div`
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;

    span {
        font-size: 24px;
        vertical-align: super;
    }

    /* --- 모바일 최적화 (480px 이하) --- */
    @media (max-width: 480px) {
        font-size: 40px; // 폰트 크기 살짝 줄이기
        span {
            font-size: 20px;
        }
    }
    /* ------------------------------ */
`;

// 날씨 상태 아이콘
export const WeatherIcon = styled.div`
    font-size: 64px;
    color: #4299e1;

    /* --- 모바일 최적화 (480px 이하) --- */
    @media (max-width: 480px) {
        font-size: 56px; // 폰트 크기 살짝 줄이기
    }
    /* ------------------------------ */
`;

// 보조 정보들을 담을 그리드 컨테이너
export const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; // 2열 (데스크탑 기본)
    gap: 16px;

    /* --- 모바일 최적화 (768px 이하) --- */
    /* 2열이 좁아지기 시작하는 태블릿 시점부터 1열로 변경 */
    @media (max-width: 768px) {
        grid-template-columns: 1fr; // 1열로 변경
        gap: 20px; // 1열일 때 항목 간 간격을 조금 더 줌
    }
    /* ------------------------------ */
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
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 6px;
`;

// 보조 정보 값 (예: '3 m/s')
export const DetailValue = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #e2e8f0;
`;
