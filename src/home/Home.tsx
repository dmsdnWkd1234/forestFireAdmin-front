import { useSeoulWeather } from '../useSeoulTemp';
import HomeNoticeSection from './HomeNoticeSection';
import HomeReportSection from './HomeReportSection';

export default function Home() {
    const { temperature, windDirection, windSpeed, weatherDescription, date, time, loading, error } = useSeoulWeather();

    if (loading) return <p>날씨 불러오는 중...</p>;
    if (error) return <p>에러: {error}</p>;

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
