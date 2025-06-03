import { useEffect, useState } from 'react';

interface WeatherData {
    temperature: string | null;
    windDirection: string | null;
    windSpeed: string | null;
    weatherDescription: string | null;
    date: string | null;
    time: string | null;
    loading: boolean;
    error: string | null;
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

    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;
    const nx = 55;
    const ny = 127;

    const getBaseDateTime = (): { baseDate: string; baseTime: string } => {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        const hours = now.getHours();
        const validHours = [2, 5, 8, 11, 14, 17, 20, 23];
        let baseHour = validHours.filter((h) => h <= hours).sort((a, b) => b - a)[0];

        if (baseHour === undefined) {
            baseHour = 23;
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            year = yesterday.getFullYear();
            month = yesterday.getMonth() + 1;
            day = yesterday.getDate();
        }

        const baseDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
        const baseTime = `${baseHour.toString().padStart(2, '0')}00`;

        return { baseDate, baseTime };
    };

    const formatDateTime = (fcstDate: string, fcstTime: string): { formattedDate: string; formattedTime: string } => {
        const year = fcstDate.slice(0, 4);
        const month = fcstDate.slice(4, 6);
        const day = fcstDate.slice(6, 8);
        const hour = fcstTime.slice(0, 2);
        const minute = fcstTime.slice(2, 4);
        return {
            formattedDate: `${year}년 ${month}월 ${day}일`,
            formattedTime: `${hour}시 ${minute}분`,
        };
    };

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
        const index = Math.round(vec / 22.5) % 16;
        const dir = directions[index];
        return `${dir.label} (${dir.emoji})`;
    };

    const getWeatherDescription = (pty: string): string => {
        switch (pty) {
            case '0':
                return '맑음 ☀️';
            case '1':
                return '비 🌧️';
            case '2':
                return '비/눈 🌨️';
            case '3':
                return '눈 ❄️';
            case '4':
                return '소나기 🌦️';
            default:
                return '정보 없음';
        }
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const { baseDate, baseTime } = getBaseDateTime();
            const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            if (data.response.header.resultCode !== '00') throw new Error(data.response.header.resultMsg || 'API 오류');

            const items: any[] = data.response.body.items.item;
            const now = new Date();
            const nowString = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
                .getDate()
                .toString()
                .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}00`;

            const filtered = items.filter((item) => item.fcstDate + item.fcstTime >= nowString);
            const nearestFcstTime = [...filtered].sort((a, b) =>
                (a.fcstDate + a.fcstTime).localeCompare(b.fcstDate + b.fcstTime)
            )[0];

            if (!nearestFcstTime) throw new Error('예보 데이터를 찾을 수 없습니다');

            const { formattedDate, formattedTime } = formatDateTime(nearestFcstTime.fcstDate, nearestFcstTime.fcstTime);
            setDate(formattedDate);
            setTime(formattedTime);

            const fcstDate = nearestFcstTime.fcstDate;
            const fcstTime = nearestFcstTime.fcstTime;

            const getValue = (category: string) =>
                items.find(
                    (item) => item.category === category && item.fcstDate === fcstDate && item.fcstTime === fcstTime
                )?.fcstValue;

            const tmp = getValue('TMP');
            const vec = getValue('VEC');
            const wsd = getValue('WSD');
            const pty = getValue('PTY');

            if (tmp) setTemperature(`${tmp}°C`);
            if (vec) setWindDirection(getWindDirection(Number(vec)));
            if (wsd) setWindSpeed(`${wsd} m/s`);
            if (pty !== undefined) setWeatherDescription(getWeatherDescription(pty));
        } catch (err: any) {
            setError(err.message || '에러 발생');
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
        fetchWeather();
        const interval = setInterval(fetchWeather, 3 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

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
