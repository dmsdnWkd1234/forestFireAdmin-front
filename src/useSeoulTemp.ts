import { useEffect, useState } from 'react';

interface WeatherData {
    temperature: string | null;
    feelsLike: string | null;
    tempMin: string | null;
    tempMax: string | null;
    humidity: string | null;
    pressure: string | null; // [추가] 기압
    cloudiness: string | null; // [추가] 구름 양
    windDirection: string | null;
    windSpeed: string | null;
    weatherDescription: string | null;
    visibility: string | null;
    sunrise: string | null;
    sunset: string | null;
    date: string | null;
    time: string | null;
    loading: boolean;
    error: string | null;
}

interface OpenWeatherApiResponse {
    cod: number;
    message?: string;
    weather: { id: number; main: string; description: string; icon: string }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number; // [존재함]
        humidity: number;
    };
    wind: { speed: number; deg: number };
    clouds: { all: number }; // [추가] 구름 정보
    visibility: number;
    sys: { sunrise: number; sunset: number };
    dt: number;
}

export function useSeoulWeather(): WeatherData {
    const [temperature, setTemperature] = useState<string | null>(null);
    const [feelsLike, setFeelsLike] = useState<string | null>(null);
    const [tempMin, setTempMin] = useState<string | null>(null);
    const [tempMax, setTempMax] = useState<string | null>(null);
    const [humidity, setHumidity] = useState<string | null>(null);
    const [pressure, setPressure] = useState<string | null>(null); // [추가]
    const [cloudiness, setCloudiness] = useState<string | null>(null); // [추가]
    const [visibility, setVisibility] = useState<string | null>(null);
    const [sunrise, setSunrise] = useState<string | null>(null);
    const [sunset, setSunset] = useState<string | null>(null);

    const [windDirection, setWindDirection] = useState<string | null>(null);
    const [windSpeed, setWindSpeed] = useState<string | null>(null);
    const [weatherDescription, setWeatherDescription] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;

    // ... (formatUnixTimestamp, formatTimeOnly, getWeatherDetails는 기존 그대로 유지) ...
    const formatUnixTimestamp = (dt: number) => {
        const dateObj = new Date(dt * 1000);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const hour = dateObj.getHours().toString().padStart(2, '0');
        const minute = dateObj.getMinutes().toString().padStart(2, '0');
        return { formattedDate: `${year}년 ${month}월 ${day}일`, formattedTime: `${hour}시 ${minute}분 기준` };
    };
    const formatTimeOnly = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    };
    const getWeatherDetails = (description: string, icon: string): string => {
        const iconEmojiMap: { [key: string]: string } = {
            '01d': '☀️',
            '01n': '🌙',
            '02d': '🌤️',
            '02n': '☁️',
            '03d': '☁️',
            '03n': '☁️',
            '04d': '☁️',
            '04n': '☁️',
            '09d': '🌧️',
            '09n': '🌧️',
            '10d': '🌦️',
            '10n': '🌧️',
            '11d': '🌩️',
            '11n': '🌩️',
            '13d': '❄️',
            '13n': '❄️',
            '50d': '🌫️',
            '50n': '🌫️',
        };
        const emoji = iconEmojiMap[icon] || '';
        return `${description} ${emoji}`.trim();
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const lat = 37.632239;
            const lon = 127.05501;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${serviceKey}&lang=kr`;

            const res = await fetch(apiUrl);
            const data: OpenWeatherApiResponse = await res.json();

            if (!res.ok || data.cod !== 200) throw new Error(data.message);

            const { formattedDate, formattedTime } = formatUnixTimestamp(data.dt);
            setDate(formattedDate);
            setTime(formattedTime);

            if (data.weather?.length > 0) {
                setWeatherDescription(getWeatherDetails(data.weather[0].description, data.weather[0].icon));
            }

            if (data.main) {
                setTemperature(`${data.main.temp.toFixed(1)}°C`);
                setFeelsLike(`${data.main.feels_like.toFixed(1)}°C`);
                setTempMin(`${data.main.temp_min.toFixed(1)}°C`);
                setTempMax(`${data.main.temp_max.toFixed(1)}°C`);
                setHumidity(`${data.main.humidity}%`);
                setPressure(`${data.main.pressure} hPa`); // [추가]
            }

            if (data.clouds) {
                setCloudiness(`${data.clouds.all}%`); // [추가]
            }

            if (data.wind) {
                const directions = [
                    '북',
                    '북북동',
                    '북동',
                    '동북동',
                    '동',
                    '동남동',
                    '남동',
                    '남남동',
                    '남',
                    '남남서',
                    '남서',
                    '서남서',
                    '서',
                    '서북서',
                    '북서',
                    '북북서',
                ];
                const index = Math.floor(((data.wind.deg + 11.25) / 22.5) % 16);
                setWindDirection(directions[index]);
                setWindSpeed(`${data.wind.speed.toFixed(1)} m/s`);
            }

            if (data.visibility) setVisibility(`${(data.visibility / 1000).toFixed(1)} km`);
            if (data.sys) {
                setSunrise(formatTimeOnly(data.sys.sunrise));
                setSunset(formatTimeOnly(data.sys.sunset));
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (serviceKey) {
            fetchWeather();
            const interval = setInterval(fetchWeather, 600000);
            return () => clearInterval(interval);
        }
    }, [serviceKey]);

    return {
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
    };
}
