import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/chartBox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 선택 가능한 데이터 타입 정의
const DATA_TYPES = [
    { key: 'Temp', label: '온도 (°C)', color: '#ff7300' },
    { key: 'Humidity', label: '습도 (%)', color: '#387908' },
    { key: 'Battery_percent', label: '배터리 (%)', color: '#8884d8' },
    { key: 'CO2', label: 'CO2 (ppm)', color: '#82ca9d' },
    { key: 'TVOC', label: 'TVOC (ppb)', color: '#ffc658' },
];

// 시간 범위 정의
const TIME_RANGES = [
    { label: '1시간', value: '1h' },
    { label: '24시간', value: '24h' },
    { label: '7일', value: '7d' },
];

export default function ChartBox({ selectedMesh }: { selectedMesh: any }) {
    const [chartData, setChartData] = useState<any[]>([]);
    const [currentType, setCurrentType] = useState(DATA_TYPES[0]); // 기본값: 온도
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timeRange, setTimeRange] = useState('1h'); // 기본값: 1시간

    // 1. 데이터 가져오기 및 가공
    useEffect(() => {
        if (!selectedMesh) {
            setChartData([]);
            return;
        }

        // [수정됨] id뿐만 아니라 timeRange도 함께 전송
        fetch(`${import.meta.env.VITE_BACK_URL}api/dashboard`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedMesh.unicast_address,
                range: timeRange, // '1h', '24h', '7d' 값을 백엔드로 전달
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.length === 0) {
                    setChartData([]); // 데이터 없으면 빈 배열
                    return;
                }

                // 백엔드에서 이미 시간순(ASC)으로 정렬하고 필터링해서 주므로
                // 프론트에서는 포맷팅만 하면 됨
                const formattedData: any = data.map((item: any) => ({
                    ...item,
                    Temp: item.Temp ? Number(item.Temp).toFixed(1) : 0,
                    Humidity: item.Humidity ? Number(item.Humidity).toFixed(1) : 0,
                    // ... 나머지 데이터도 필요하면 처리
                    displayTime: formatXAxis(item.Time, timeRange),
                    originalTime: new Date(item.Time),
                }));

                setChartData(formattedData);
            })
            .catch((err) => console.error('차트 데이터 로드 실패:', err));
    }, [selectedMesh, timeRange]); // timeRange 변경 시 재요청

    // X축 라벨 포맷터 함수
    const formatXAxis = (timeStr: string, range: string) => {
        const date = new Date(timeStr);
        if (range === '7d') {
            // 7일이면 날짜 위주 (예: 11/27)
            return `${date.getMonth() + 1}/${date.getDate()}`;
        } else {
            // 1시간, 24시간이면 시간 위주 (예: 14:30)
            return date.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // 24시간제
            });
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleTypeSelect = (type: any) => {
        setCurrentType(type);
        setIsMenuOpen(false);
    };

    return (
        <S.Root>
            <S.ChartBox>
                <S.Header>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <S.Title>{selectedMesh ? `${currentType.label}` : '데이터 추이'}</S.Title>

                        {/* [NEW] 시간 범위 선택 버튼 그룹 */}
                        <S.ButtonGroup>
                            {TIME_RANGES.map((range) => (
                                <S.RangeButton
                                    key={range.value}
                                    $isActive={timeRange === range.value}
                                    onClick={() => setTimeRange(range.value)}
                                >
                                    {range.label}
                                </S.RangeButton>
                            ))}
                        </S.ButtonGroup>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <S.SelectButton onClick={toggleMenu}>
                            {currentType.key} {isMenuOpen ? '▴' : '▾'}
                        </S.SelectButton>
                        {isMenuOpen && (
                            <S.OptionList>
                                {DATA_TYPES.map((type) => (
                                    <S.OptionItem key={type.key} onClick={() => handleTypeSelect(type)}>
                                        {type.label}
                                    </S.OptionItem>
                                ))}
                            </S.OptionList>
                        )}
                    </div>
                </S.Header>

                <S.ChartArea>
                    {selectedMesh && chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="displayTime"
                                    tick={{ fontSize: 11, fill: '#666' }}
                                    interval="preserveStartEnd"
                                    minTickGap={30} // 라벨 겹침 방지
                                />
                                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#666' }} width={35} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                    }}
                                    // 툴팁에는 정확한 전체 시간 표시
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0) {
                                            const date = payload[0].payload.originalTime;
                                            return date.toLocaleString('ko-KR');
                                        }
                                        return label;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey={currentType.key}
                                    stroke={currentType.color}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                fontSize: '14px',
                            }}
                        >
                            {selectedMesh
                                ? chartData.length === 0
                                    ? '선택한 기간의 데이터가 없습니다.'
                                    : '데이터 로딩 중...'
                                : '지도에서 기기를 선택해주세요.'}
                        </div>
                    )}
                </S.ChartArea>
            </S.ChartBox>
        </S.Root>
    );
}
