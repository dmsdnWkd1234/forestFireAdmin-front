import { useEffect, useState } from 'react';

interface TemperatureData {
    temperature: string | null;
    time: string | null;
    loading: boolean;
    error: string | null;
}

export function useSeoulTemperature(): TemperatureData {
    console.log('fetchTemperature 시작');
    const [temperature, setTemperature] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;
    const nx = 55; // 서울 격자 X
    const ny = 127; // 서울 격자 Y

    // base_date, base_time 구하는 함수 (3시간 단위, 0~2시는 전날 23시 기준)
    const getBaseDateTime = (): { baseDate: string; baseTime: string } => {
        const now = new Date();

        // API는 0500부터 시작하니까, 0500 이전이면 전날 2300 처리
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        const hours = now.getHours();

        // 3시간 간격 배열, 24시간 중 API가 허용하는 시간들 (0500, 0800, 1100, 1400, 1700, 2000, 2300)
        const validHours = [2, 5, 8, 11, 14, 17, 20, 23];

        // 지금 시간보다 작거나 같은 가장 가까운 validHours 찾기
        let baseHour = validHours.filter((h) => h <= hours).sort((a, b) => b - a)[0];

        // 만약 없으면 (즉, 지금 시간이 0~4시면) 전날 23시로 처리
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

        console.log('Base Date:', baseDate, 'Base Time:', baseTime); // 디버깅용 로그

        return { baseDate, baseTime };
    };

    const fetchTemperature = async () => {
        setLoading(true);
        setError(null);

        try {
            const { baseDate, baseTime } = getBaseDateTime();
            console.log('Base Date:', baseDate, 'Base Time:', baseTime); // 디버깅용 로그
            const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();

            if (data.response.header.resultCode !== '00') {
                throw new Error(data.response.header.resultMsg || 'API 오류');
            }

            const items: any[] = data.response.body.items.item;

            // TMP 카테고리만 필터링
            const now = new Date();
            const nowString = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
                .getDate()
                .toString()
                .padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}00`;

            const tmpItems = items.filter((item: any) => item.category === 'TMP');

            const nearest = tmpItems
                .filter((item: any) => item.fcstDate + item.fcstTime >= nowString)
                .sort((a: any, b: any) => {
                    const aTime = a.fcstDate + a.fcstTime;
                    const bTime = b.fcstDate + b.fcstTime;
                    return aTime.localeCompare(bTime);
                })[0];

            if (nearest) {
                setTemperature(nearest.fcstValue);
                setTime(`${nearest.fcstDate} ${nearest.fcstTime}`);
            } else {
                setError('예보 데이터를 찾을 수 없습니다');
            }
        } catch (err: any) {
            setError(err.message || '에러 발생');
            setTemperature(null);
            setTime(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemperature();
        const interval = setInterval(fetchTemperature, 3 * 60 * 60 * 1000); // 3시간마다 갱신
        return () => clearInterval(interval);
    }, []);

    return { temperature, time, loading, error };
}
