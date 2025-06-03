import { useSeoulTemperature } from '../useSeoulTemp';
import Report from '../reports/Report';

export default function Home() {
    const { temperature, time, loading, error } = useSeoulTemperature();

    if (loading) return <div>불러오는 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div>
            <h1>홈</h1>
            <section id="날씨정보">
                <h2>🌡️ 서울 현재 기온</h2>
                <p>{temperature}°C</p>
                <small>업데이트 시각: {time}</small>
            </section>
            <section>
                <>test3</>
                <Report></Report>
            </section>
        </div>
    );
}
