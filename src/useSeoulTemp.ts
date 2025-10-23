import { useEffect, useState } from 'react';

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

// category 값에 따른 데이터를 저장할 인터페이스 (옵션)
interface ApiItem {
    baseDate: string;
    baseTime: string;
    category: string;
    nx: number;
    ny: number;
    obsrValue: string; // 예보가 아닌 관측값이므로 obsrValue
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
    const nx = 55; // 서울 중구 좌표 예시
    const ny = 127;

    /**
     * 초단기실황 API (getUltraSrtNcst)용 base_date, base_time 생성 함수
     * 매 시 40분 이전에는 이전 시간대의 데이터를 요청해야 함
     */
    const getBaseDateTime = (): { baseDate: string; baseTime: string } => {
        const now = new Date();
        let base_date = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

        let base_time_hours = now.getHours();
        const currentMinutes = now.getMinutes();

        // 40분 이전이면 이전 시간 데이터 사용
        if (currentMinutes < 40) {
            // 자정 이전 시간 처리
            if (base_time_hours === 0) {
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                base_date = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
                base_time_hours = 23;
            } else {
                base_time_hours -= 1;
            }
        }

        const base_time = `${base_time_hours.toString().padStart(2, '0')}00`; // HH00 형식

        return { baseDate: base_date, baseTime: base_time };
    };

    /** 날짜와 시간 문자열 포맷팅 (YYYY년 MM월 DD일, HH시 MM분) */
    const formatDateTime = (baseDate: string, baseTime: string): { formattedDate: string; formattedTime: string } => {
        const year = baseDate.slice(0, 4);
        const month = baseDate.slice(4, 6);
        const day = baseDate.slice(6, 8);
        const hour = baseTime.slice(0, 2);
        const minute = baseTime.slice(2, 4); // "00"
        return {
            formattedDate: `${year}년 ${month}월 ${day}일`,
            formattedTime: `${hour}시 ${minute}분 기준`, // 기준 시간 명시
        };
    };

    /** 풍향(Vector) 각도를 16방위 문자와 이모지로 변환 */
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
        // API 명세에 따라 +11.25 후 22.5로 나누어 인덱스 계산
        const index = Math.floor(((vec + 11.25) / 22.5) % 16);
        const dir = directions[index];
        return `${dir.label} (${dir.emoji})`;
    };

    /** 강수형태(PTY) 코드에 따른 날씨 설명과 이모지 반환 */
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
            case '5':
                return '빗방울 💧'; // 4번(소나기)는 예보 코드
            case '6':
                return '빗방울/눈날림 🌨️💧';
            case '7':
                return '눈날림 🌨️';
            default:
                return '정보 없음';
        }
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const { baseDate, baseTime } = getBaseDateTime();
            const apiUrl = `/api/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst?authKey=${serviceKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

            const data = await res.json();
            // API 자체 에러 처리 (resultCode가 '00'이 아닌 경우)
            if (data.response?.header?.resultCode !== '00') {
                throw new Error(data.response?.header?.resultMsg || 'API 응답 오류');
            }
            // items가 없는 경우 또는 배열이 아닌 경우 처리
            const items: ApiItem[] = data.response?.body?.items?.item;
            if (!items || !Array.isArray(items) || items.length === 0) {
                throw new Error('날씨 데이터를 찾을 수 없습니다.');
            }

            // 날짜와 시간 상태 업데이트 (API 기준 시간 사용)
            const { formattedDate, formattedTime } = formatDateTime(items[0].baseDate, items[0].baseTime);
            setDate(formattedDate);
            setTime(formattedTime);

            // 각 category 값 찾아서 상태 업데이트
            const findValue = (category: string): string | undefined =>
                items.find((item) => item.category === category)?.obsrValue;

            const tempValue = findValue('T1H'); // 기온
            const windVecValue = findValue('VEC'); // 풍향
            const windSpdValue = findValue('WSD'); // 풍속
            const ptyValue = findValue('PTY'); // 강수형태

            if (tempValue) setTemperature(`${parseFloat(tempValue).toFixed(1)}°C`); // 소수점 1자리
            if (windVecValue) setWindDirection(getWindDirection(Number(windVecValue)));
            if (windSpdValue) setWindSpeed(`${windSpdValue} m/s`);
            if (ptyValue !== undefined) setWeatherDescription(getWeatherDescription(ptyValue));
        } catch (err: any) {
            console.error('날씨 정보 가져오기 실패:', err); // 콘솔에 에러 로그 출력
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
        fetchWeather(); // 컴포넌트 마운트 시 즉시 실행

        // 10분마다 날씨 정보 갱신 (600000ms = 10분)
        const interval = setInterval(fetchWeather, 600000);

        // 컴포넌트 언마운트 시 인터벌 정리
        return () => clearInterval(interval);
    }, []); // 빈 배열: 마운트 시 1회만 실행되도록 설정

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
