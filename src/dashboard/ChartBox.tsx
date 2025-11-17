import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/chartBox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 선택 가능한 데이터 타입 정의
const DATA_TYPES = [
    { key: 'Temp', label: '온도 (°C)', color: '#ff7300' },
    { key: 'Humidity', label: '습도 (%)', color: '#387908' },
    { key: 'Battery_Persent', label: '배터리 (%)', color: '#8884d8' },
    { key: 'CO2', label: 'CO2 (ppm)', color: '#82ca9d' },
    { key: 'TVOC', label: 'TVOC (ppb)', color: '#ffc658' },
];

// props 타입 정의 (selectedMesh가 객체로 들어옴)
export default function ChartBox({ selectedMesh }: { selectedMesh: any }) {
    const [chartData, setChartData] = useState([]);
    const [currentType, setCurrentType] = useState(DATA_TYPES[0]); // 기본값: 온도
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림/닫힘 상태

    // 1. 데이터 가져오기 및 가공
    useEffect(() => {
        if (!selectedMesh) {
            setChartData([]);
            return;
        }

        // 선택된 메시의 ID(unicast_address)로 데이터 요청
        fetch(`${import.meta.env.VITE_BACK_URL}api/dashboard`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedMesh.unicast_address }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.length === 0) return;

                // 최신순 데이터를 시간순(과거->현재)으로 뒤집고 포맷팅
                const formattedData: any = [...data].reverse().map((item) => ({
                    ...item,
                    // X축 시간 표시 (예: 14:30)
                    displayTime: new Date(item.Time).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit', // 필요하면 초 단위까지
                    }),
                }));
                setChartData(formattedData);
            })
            .catch((err) => console.error('차트 데이터 로드 실패:', err));
    }, [selectedMesh]); // selectedMesh가 바뀔 때마다 실행

    // 2. 메뉴 토글 핸들러
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // 3. 데이터 타입 변경 핸들러
    const handleTypeSelect = (type: any) => {
        setCurrentType(type);
        setIsMenuOpen(false); // 선택 후 메뉴 닫기
    };

    return (
        <S.Root>
            <S.ChartBox>
                <S.Header>
                    {/* 타이틀: 현재 선택된 데이터 종류 표시 */}
                    <S.Title>{selectedMesh ? `${currentType.label} 추이` : '데이터 추이'}</S.Title>

                    {/* + 버튼 */}
                    <S.SelectButton onClick={toggleMenu}>{isMenuOpen ? '−' : '+'}</S.SelectButton>

                    {/* 드롭다운 메뉴 (조건부 렌더링) */}
                    {isMenuOpen && (
                        <S.OptionList>
                            {DATA_TYPES.map((type) => (
                                <S.OptionItem key={type.key} onClick={() => handleTypeSelect(type)}>
                                    {type.label}
                                </S.OptionItem>
                            ))}
                        </S.OptionList>
                    )}
                </S.Header>

                <S.ChartArea>
                    {selectedMesh && chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="displayTime"
                                    tick={{ fontSize: 12 }}
                                    interval="preserveStartEnd" // 겹치지 않게 자동 조절
                                />
                                <YAxis
                                    domain={['auto', 'auto']} // 값에 따라 스케일 자동 조절
                                    tick={{ fontSize: 12 }}
                                    width={40}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey={currentType.key} // 동적으로 선택된 키(Temp, Battery 등) 사용
                                    stroke={currentType.color}
                                    strokeWidth={2}
                                    dot={false} // 점 숨기기 (깔끔하게)
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
                            }}
                        >
                            {selectedMesh ? '데이터 로딩 중...' : '지도에서 기기를 선택해주세요.'}
                        </div>
                    )}
                </S.ChartArea>
            </S.ChartBox>
        </S.Root>
    );
}
