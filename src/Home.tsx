import { useEffect, useState } from 'react';

interface WeatherData {
    temperature: number;
    condition: string;
    location: string;
}

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [notices, _] = useState<string[]>(['서버 점검 예정', '새로운 업데이트 소식']);

    useEffect(() => {
        // 가상의 날씨 데이터 (실제 API 연동 시 fetch 사용)
        setTimeout(() => {
            setWeather({
                temperature: 22,
                condition: '맑음',
                location: '서울',
            });
        }, 1000);
    }, []);

    return (
        <div>
            <h1>홈</h1>
            <section>
                <h2>현재 날씨</h2>
                {weather ? (
                    <p>
                        {weather.location}: {weather.temperature}°C, {weather.condition}
                    </p>
                ) : (
                    <p>날씨 정보를 불러오는 중...</p>
                )}
            </section>
            <section>
                <h2>안내</h2>
                <ul>
                    {notices.map((notice, index) => (
                        <li key={index}>{notice}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
