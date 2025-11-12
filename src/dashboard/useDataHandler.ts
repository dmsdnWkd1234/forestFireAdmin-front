import { useEffect, useState } from 'react';

/**
 * 헬퍼 함수: API 원본 데이터를 차트용 데이터로 가공 (Single-line)
 * @param {Array} rawData - API에서 받은 원본 데이터 배열
 * @param {String} dataTypeKey - 가공을 원하는 데이터 키 (예: "Temp", "CO2")
 * @returns {Array} 차트용으로 가공된 데이터 (예: [{ name: "시간", value: 28.87 }])
 */
const formatDataForChart = (rawData: any, dataTypeKey: any) => {
    // 1. 데이터가 없거나, 원하는 키가 없으면 빈 배열 반환
    if (!rawData || rawData.length === 0 || !dataTypeKey) {
        return [];
    }

    // 2. API 데이터는 최신순(내림차순)이므로, 시간순(오름차순)으로 뒤집기
    const reversedData = [...rawData].reverse();

    // 3. 차트 형식에 맞게 데이터 가공 (map)
    return reversedData.map((item) => ({
        // X축: 시간 (ko-KR 형식, 예: "오후 12:40:26")
        name: new Date(item.Time).toLocaleTimeString('ko-KR'),

        // Y축: 선택한 키(dataTypeKey)에 해당하는 값
        // item['Temp'], item['CO2']...
        value: item[dataTypeKey],
    }));
};

/**
 * 대시보드 데이터를 가져오고, 원하는 형식으로 가공하는 커스텀 훅
 * @param {String} dataTypeKey - "Temp", "Humidity", "CO2", "TVOC" 등
 */
export default function useDashHandler(dataTypeKey: any) {
    // 1. API 원본 데이터를 저장할 State
    const [rawData, setRawData] = useState([]);
    // 2. 가공된 차트용 데이터를 저장할 State
    const [processedData, setProcessedData] = useState([]);

    // ----------------------------------------------
    // 첫 번째 useEffect: 데이터 페칭 (컴포넌트 마운트 시 1회만 실행)
    // ----------------------------------------------
    useEffect(() => {
        fetch(`http://localhost:3002/api/dashboard`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 16, // ID는 16으로 고정
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRawData(data); // 원본 데이터를 state에 저장
            })
            .catch((err) => console.error('대시보드 데이터 불러오기 실패:', err));

        // 의존성 배열을 []로 비워두어, 맨 처음 1회만 실행되게 함
    }, []);

    // ----------------------------------------------
    // 두 번째 useEffect: 데이터 가공 (원본 데이터 or 선택한 키가 바뀔 때 실행)
    // ----------------------------------------------
    useEffect(() => {
        // 원본 데이터를 헬퍼 함수를 이용해 가공
        const formattedData: any = formatDataForChart(rawData, dataTypeKey);

        // 가공된 데이터를 state에 저장
        setProcessedData(formattedData);

        // rawData가 변경되거나, dataTypeKey가 변경될 때마다 이펙트가 다시 실행됨
    }, [rawData, dataTypeKey]);

    // 3. 최종적으로 가공된 데이터를 반환
    return { data: processedData };
}
