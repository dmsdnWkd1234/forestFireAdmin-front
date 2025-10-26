import { useEffect, useState } from 'react';

// 반환할 데이터 인터페이스 (기존과 동일)
interface WeatherData {
    temperature: string | null;
    windDirection: string | null;
    windSpeed: string | null;
    weatherDescription: string | null;
    date: string | null; // 기준 날짜 (예: 2025년 10월 21일)
    time: string | null; // 기준 시간 (예: 14시 00분)
    loading: boolean;
    error: string | null;
}

// OpenWeatherMap API 응답 타입 (필요한 부분만 정의)
interface OpenWeatherApiResponse {
    cod: number;
    message?: string;
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    dt: number; // Unix timestamp (초 단위)
    timezone: number; // UTC로부터의 시간차 (초 단위)
}

export function useSeoulWeather(): WeatherData {
    const [temperature, setTemperature] = useState<string | null>(null);
    const [windDirection, setWindDirection] = useState<string | null>(null);
    const [windSpeed, setWindSpeed] = useState<string | null>(null);
    const [weatherDescription, setWeatherDescription] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // .env 파일에서 API 키 가져오기 (Vite 환경)
    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;
    // 또는 사용자가 제공한 하드코딩된 키 사용:
    // const serviceKey = '76a00e96c425fd0df4a786b204ce9c55';

    // OpenWeatherMap API는 위도(lat), 경도(lon)를 사용합니다.
    const lat = 55; // 서울이 아닌 Filimoshka 좌표 (제공된 응답 기준)
    const lon = 127;

    /** * [신규] Unix timestamp(초)를 날짜와 시간 문자열로 포맷팅
     * (사용자의 로컬 시간대 기준)
     */
    const formatUnixTimestamp = (dt: number): { formattedDate: string; formattedTime: string } => {
        const dateObj = new Date(dt * 1000); // 밀리초로 변환

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const hour = dateObj.getHours().toString().padStart(2, '0');
        const minute = dateObj.getMinutes().toString().padStart(2, '0');

        return {
            formattedDate: `${year}년 ${month}월 ${day}일`,
            formattedTime: `${hour}시 ${minute}분 기준`,
        };
    };

    /** * [신규] OpenWeatherMap 아이콘 코드를 이모지로 변환
     */
    const getWeatherDetails = (description: string, icon: string): string => {
        const iconEmojiMap: { [key: string]: string } = {
            '01d': '☀️', // clear sky (day)
            '01n': '🌙', // clear sky (night)
            '02d': '🌤️', // few clouds (day)
            '02n': '☁️', // few clouds (night)
            '03d': '☁️', // scattered clouds
            '03n': '☁️', // scattered clouds
            '04d': '☁️', // broken clouds (온흐림)
            '04n': '☁️', // broken clouds
            '09d': '🌧️', // shower rain
            '09n': '🌧️', // shower rain
            '10d': '🌦️', // rain (day)
            '10n': '🌧️', // rain (night)
            '11d': '🌩️', // thunderstorm
            '11n': '🌩️', // thunderstorm
            '13d': '❄️', // snow
            '13n': '❄️', // snow
            '50d': '🌫️', // mist
            '50n': '🌫️', // mist
        };
        const emoji = iconEmojiMap[icon] || ''; // 맵에 없으면 빈 문자열
        return `${description} ${emoji}`.trim(); // 예: "온흐림 ☁️"
    };

    /** * [유지] 풍향(Vector) 각도를 16방위 문자와 이모지로 변환
     * (OpenWeatherMap의 'deg' 값에도 동일하게 적용 가능)
     */
    const getWindDirection = (vec: number): string => {
        const directions = [
            { label: '북', emoji: '⬆️' },
            { label: '북북동', emoji: '⬆️↗️' },
            { label: '북동', emoji: '↗️' },
            { label: '동북동', emoji: '➡️↗️' },
            { label: '동', emoji: '➡️' },
            { label: '동남동', emoji: '➡️↘️' },
            { label: '남동', emoji: '↘️' },
            { label: '남남동', emoji: '⬇️↘️' },
            { label: '남', emoji: '⬇️' },
            { label: '남남서', emoji: '⬇️↙️' },
            { label: '남서', emoji: '↙️' },
            { label: '서남서', emoji: '⬅️↙️' },
            { label: '서', emoji: '⬅️' },
            { label: '서북서', emoji: '⬅️↖️' },
            { label: '북서', emoji: '↖️' },
            { label: '북북서', emoji: '⬆️↖️' },
        ];
        const index = Math.floor(((vec + 11.25) / 22.5) % 16);
        const dir = directions[index];
        return `${dir.label} (${dir.emoji})`;
    };

    /**
     * [수정] OpenWeatherMap API 호출 로직
     */
    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            // KMA의 base_date, base_time 계산 로직(getBaseDateTime) 불필요
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=37.632239&lon=127.05501&units=metric&appid=${serviceKey}&lang=kr`;

            const res = await fetch(apiUrl);

            // res.text() 후 res.json() 호출 시 에러 발생. res.json()만 사용
            const data: OpenWeatherApiResponse = await res.json();

            // HTTP 에러 처리 (res.ok 사용)
            if (!res.ok) {
                // API가 401, 404, 500 등을 반환할 때
                throw new Error(data.message || `HTTP error: ${res.status}`);
            }

            // OpenWeatherMap API 자체 에러 처리 (응답 코드가 200이 아닌 경우)
            // (이미 !res.ok에서 잡히지만, 200 응답에 에러 메시지가 오는 경우 대비)
            if (data.cod !== 200) {
                throw new Error(data.message || 'API 응답 오류');
            }

            // KMA 'items' 배열 파싱 로직 대신, OpenWeatherMap JSON 구조 직접 파싱

            // 1. 날짜와 시간 (Unix timestamp 파싱)
            const { formattedDate, formattedTime } = formatUnixTimestamp(data.dt);
            setDate(formattedDate);
            setTime(formattedTime);

            // 2. 날씨 설명 (weather 배열의 첫 번째 항목 사용)
            if (data.weather && data.weather.length > 0) {
                const weatherInfo = data.weather[0];
                setWeatherDescription(getWeatherDetails(weatherInfo.description, weatherInfo.icon));
            } else {
                setWeatherDescription('정보 없음');
            }

            // 3. 기온 (main.temp)
            if (data.main?.temp !== undefined) {
                setTemperature(`${data.main.temp.toFixed(1)}°C`);
            }

            // 4. 풍향 (wind.deg) - 기존 getWindDirection 함수 재활용
            if (data.wind?.deg !== undefined) {
                setWindDirection(getWindDirection(data.wind.deg));
            }

            // 5. 풍속 (wind.speed)
            if (data.wind?.speed !== undefined) {
                // 소수점 1자리로 통일 (기온과 일관성)
                setWindSpeed(`${data.wind.speed.toFixed(1)} m/s`);
            }
        } catch (err: any) {
            console.error('날씨 정보 가져오기 실패:', err);
            setError(err.message || '날씨 정보를 가져오는 중 에러 발생');

            // 에러 발생 시 기존 데이터 초기화 (선택 사항)
            setTemperature(null);
            setWindDirection(null);
            setWindSpeed(null);
            setWeatherDescription(null);
            setDate(null);
            setTime(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!serviceKey) {
            setError('VITE_WEATHER_API_KEY가 설정되지 않았습니다.');
            setLoading(false);
            return;
        }

        fetchWeather(); // 컴포넌트 마운트 시 즉시 실행

        // 10분마다 날씨 정보 갱신 (OpenWeatherMap 무료 플랜은 1시간 주기가 더 적절할 수 있음)
        const interval = setInterval(fetchWeather, 600000); // 10분

        // 컴포넌트 언마운트 시 인터벌 정리
        return () => clearInterval(interval);
    }, [serviceKey]); // serviceKey가 변경될 경우에도 useEffect가 재실행되도록 추가

    return {
        temperature,
        windDirection,
        windSpeed,
        weatherDescription,
        date,
        time,
        loading,
        error,
    };
}
