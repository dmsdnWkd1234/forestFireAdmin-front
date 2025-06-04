import { useSeoulWeather } from '../useSeoulTemp';
import HomeNoticeSection from './HomeNoticeSection';
import HomeReportSection from './HomeReportSection';

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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>현재 서울 날씨</h1>
                <p>🌡 기온: {temperature}</p>
                <p>💨 바람 방향: {windDirection}</p>
                <p>💨 풍속: {windSpeed}</p>
                <p>🌦 날씨 상태: {weatherDescription}</p>
                <p>📅 예보 날짜: {date}</p>
                <p>⏰ 예보 시간: {time}</p>
                <HomeReportSection></HomeReportSection>
            </div>
            <>
                <HomeNoticeSection></HomeNoticeSection>
            </>
        </>
    );
}
