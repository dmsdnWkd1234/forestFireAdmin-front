import { useSeoulWeather } from '../useSeoulTemp';
import HomeNoticeSection from './HomeNoticeSection';
import HomeReportSection from './HomeReportSection';
import * as SH from '../style/home/HomeContainer';
import * as S from '../style/home/WeatherCard';
import { FiSun, FiCompass, FiCalendar, FiClock, FiVideo } from 'react-icons/fi';

export default function Home() {
    const { temperature, windDirection, windSpeed, weatherDescription, date, time, loading, error } = useSeoulWeather();

    // 에러나 로딩 시에도 레이아웃 틀은 유지하는 것이 보기 좋습니다.

    return (
        <SH.homeRoot>
            {/* 1. 상단 섹션: 날씨 + CCTV */}
            <SH.homeUnderRoot>
                {/* 날씨 영역 */}
                <SH.Section>
                    {/* GlassCard에 height: 100%를 주어 옆의 영상과 높이를 맞춤 */}
                    <S.GlassCard style={{ height: '100%', boxSizing: 'border-box' }}>
                        {loading ? (
                            <p style={{ color: 'white' }}>날씨 정보 로딩 중...</p>
                        ) : error ? (
                            <p style={{ color: 'white' }}>날씨 정보를 불러올 수 없습니다.</p>
                        ) : (
                            <>
                                <S.CardTitle>현재 서울 날씨</S.CardTitle>
                                <S.MainInfoWrapper>
                                    <S.Temperature>{temperature}</S.Temperature>
                                    <S.WeatherIcon>
                                        <FiSun />
                                    </S.WeatherIcon>
                                </S.MainInfoWrapper>
                                <S.DetailGrid>
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiCompass /> 바람
                                        </S.DetailLabel>
                                        <S.DetailValue>
                                            {windDirection} {windSpeed}
                                        </S.DetailValue>
                                    </S.DetailItem>
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiSun /> 날씨
                                        </S.DetailLabel>
                                        <S.DetailValue>{weatherDescription}</S.DetailValue>
                                    </S.DetailItem>
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiCalendar /> 날짜
                                        </S.DetailLabel>
                                        <S.DetailValue>{date}</S.DetailValue>
                                    </S.DetailItem>
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiClock /> 시간
                                        </S.DetailLabel>
                                        <S.DetailValue>{time}</S.DetailValue>
                                    </S.DetailItem>
                                </S.DetailGrid>
                            </>
                        )}
                    </S.GlassCard>
                </SH.Section>

                {/* CCTV 영역 */}
                <SH.Section>
                    <SH.VideoContainer>
                        <SH.Title>
                            <FiVideo size={20} color="#007bff" /> 실시간 현장 모니터링
                        </SH.Title>
                        <SH.VideoWrapper>
                            <SH.RecBadge>REC</SH.RecBadge>
                            <img
                                src="https://cam.duckpict.com/video_feed"
                                alt="Live Camera"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                        target.parentElement.innerHTML =
                                            '<div style="color:white; display:flex; justify-content:center; align-items:center; height:100%;">신호 없음 (No Signal)</div>';
                                    }
                                }}
                            />
                        </SH.VideoWrapper>
                    </SH.VideoContainer>
                </SH.Section>
            </SH.homeUnderRoot>

            {/* 2. 하단 섹션: 공지사항 + 신고내역 */}
            <SH.homeUnderRoot>
                <SH.Section>
                    {/* HomeNoticeSection 내부에서 SH.Container 등을 사용할 것임 */}
                    <HomeNoticeSection />
                </SH.Section>
                <SH.Section>
                    <HomeReportSection />
                </SH.Section>
            </SH.homeUnderRoot>
        </SH.homeRoot>
    );
}
