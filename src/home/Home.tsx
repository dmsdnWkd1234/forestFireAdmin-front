import { useSeoulWeather } from '../useSeoulTemp';
import HomeNoticeSection from './HomeNoticeSection';
import HomeReportSection from './HomeReportSection';
import * as SH from '../style/home/HomeContainer';
import * as S from '../style/home/WeatherCard';
import {
    FiSun,
    FiCompass,
    FiCalendar,
    FiClock,
    FiVideo,
    FiDroplet,
    FiEye,
    FiSunrise,
    FiActivity,
    FiCloud, // [아이콘 추가]
} from 'react-icons/fi';

export default function Home() {
    const {
        temperature,
        feelsLike,
        tempMin,
        tempMax,
        humidity,
        pressure,
        cloudiness,
        windDirection,
        windSpeed,
        weatherDescription,
        visibility,
        sunrise,
        sunset,
        date,
        time,
        loading,
        error,
    } = useSeoulWeather();

    return (
        <SH.homeRoot>
            <SH.homeUnderRoot>
                <SH.Section>
                    <S.GlassCard style={{ height: '100%', boxSizing: 'border-box' }}>
                        {loading ? (
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                날씨 정보 로딩 중...
                            </div>
                        ) : error ? (
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                날씨 정보 오류
                            </div>
                        ) : (
                            <>
                                <S.CardTitle>현재 서울 날씨</S.CardTitle>

                                <S.MainInfoWrapper>
                                    <S.Temperature>{temperature}</S.Temperature>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: '12px',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <span style={{ fontSize: '0.95rem', color: '#e0e0e0', fontWeight: '500' }}>
                                            체감 {feelsLike}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#bdbdbd', marginTop: '2px' }}>
                                            ▼ {tempMin} / ▲ {tempMax}
                                        </span>
                                    </div>
                                    <S.WeatherIcon>
                                        <FiSun />
                                    </S.WeatherIcon>
                                </S.MainInfoWrapper>

                                {/* 4줄 2열 = 총 8개 항목으로 꽉 채움 */}
                                <S.DetailGrid>
                                    {/* 1. 날씨 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiSun /> 날씨
                                        </S.DetailLabel>
                                        <S.DetailValue>{weatherDescription}</S.DetailValue>
                                    </S.DetailItem>

                                    {/* 2. 습도 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiDroplet /> 습도
                                        </S.DetailLabel>
                                        <S.DetailValue>{humidity}</S.DetailValue>
                                    </S.DetailItem>

                                    {/* 3. 바람 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiCompass /> 바람
                                        </S.DetailLabel>
                                        <S.DetailValue>
                                            {windDirection} {windSpeed}
                                        </S.DetailValue>
                                    </S.DetailItem>

                                    {/* 4. 가시거리 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiEye /> 가시거리
                                        </S.DetailLabel>
                                        <S.DetailValue>{visibility}</S.DetailValue>
                                    </S.DetailItem>

                                    {/* 5. [신규] 기압 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiActivity /> 대기압
                                        </S.DetailLabel>
                                        <S.DetailValue>{pressure}</S.DetailValue>
                                    </S.DetailItem>

                                    {/* 6. [신규] 구름 양 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiCloud /> 구름 양
                                        </S.DetailLabel>
                                        <S.DetailValue>{cloudiness}</S.DetailValue>
                                    </S.DetailItem>

                                    {/* 7. 일출/일몰 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiSunrise /> 일출/일몰
                                        </S.DetailLabel>
                                        <S.DetailValue>
                                            {sunrise} / {sunset}
                                        </S.DetailValue>
                                    </S.DetailItem>

                                    {/* 8. 기준 시간 */}
                                    <S.DetailItem>
                                        <S.DetailLabel>
                                            <FiClock /> 기준 시간
                                        </S.DetailLabel>
                                        <S.DetailValue>{time}</S.DetailValue>
                                    </S.DetailItem>
                                </S.DetailGrid>

                                <div
                                    style={{
                                        marginTop: 'auto',
                                        paddingTop: '10px',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    <FiCalendar style={{ marginRight: '6px' }} /> {date}
                                </div>
                            </>
                        )}
                    </S.GlassCard>
                </SH.Section>

                {/* CCTV 영역 (기존 유지) */}
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
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                        target.parentElement.innerHTML =
                                            '<div style="color:white; display:flex; justify-content:center; align-items:center; height:100%; background:#222;">신호 없음 (No Signal)</div>';
                                    }
                                }}
                            />
                        </SH.VideoWrapper>
                    </SH.VideoContainer>
                </SH.Section>
            </SH.homeUnderRoot>

            <SH.homeUnderRoot>
                <SH.Section>
                    <HomeNoticeSection />
                </SH.Section>
                <SH.Section>
                    <HomeReportSection />
                </SH.Section>
            </SH.homeUnderRoot>
        </SH.homeRoot>
    );
}
