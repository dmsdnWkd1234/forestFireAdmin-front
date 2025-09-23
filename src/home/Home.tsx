import { useSeoulWeather } from '../useSeoulTemp';
import HomeNoticeSection from './HomeNoticeSection';
import HomeReportSection from './HomeReportSection';
import * as S from '../style/home/WeatherCard';
import { FiSun, FiCompass, FiCalendar, FiClock } from 'react-icons/fi';

export default function Home() {
    const { temperature, windDirection, windSpeed, weatherDescription, date, time, loading, error } = useSeoulWeather();

    if (loading) return <p>날씨 불러오는 중...</p>;
    if (error)
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <>날씨 정보를 불러오는데 실패했습니다 잠시 후 다시 시도해주세요</>
                    <HomeReportSection></HomeReportSection>
                </div>
                <>
                    <HomeNoticeSection></HomeNoticeSection>
                </>
            </>
        );

    return (
        <>
            <S.GlassCard>
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
                            <FiCalendar /> 예보 날짜
                        </S.DetailLabel>
                        <S.DetailValue>{date}</S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                        <S.DetailLabel>
                            <FiClock /> 예보 시간
                        </S.DetailLabel>
                        <S.DetailValue>{time}</S.DetailValue>
                    </S.DetailItem>
                </S.DetailGrid>
            </S.GlassCard>
            <>
                <HomeNoticeSection></HomeNoticeSection>
            </>
        </>
    );
}
