import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/dataCard';

export default function DataCard({ selectedMesh }: { selectedMesh: any }) {
    const [latestData, setLatestData] = useState<any>(null);

    useEffect(() => {
        if (selectedMesh) {
            const addressToFetch = selectedMesh.unicast_address;

            fetch(`${import.meta.env.VITE_BACK_URL}api/dashboard`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: addressToFetch }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        setLatestData(data[0]);
                    } else {
                        setLatestData(null);
                    }
                })
                .catch((err) => {
                    console.error('카드 데이터 불러오기 실패:', err);
                    setLatestData(null);
                });
        } else {
            setLatestData(null);
        }
    }, [selectedMesh]);

    // --- 상태 판단 로직 함수들 ---

    // 1. 온도 상태 (임의 기준: 35도 이상 주의, 50도 이상 위험)
    const getTempStatus = (temp: number) => {
        if (temp == null) return { text: '...', color: '#ccc' };
        if (temp >= 50) return { text: '위험', color: '#FF4D4F' }; // 빨강
        if (temp >= 35) return { text: '주의', color: '#FAAD14' }; // 주황
        return { text: '양호', color: '#52C41A' }; // 초록
    };

    // 2. 습도 상태 (임의 기준: 40% 이하 주의, 20% 이하 위험)
    const getHumidStatus = (humid: number) => {
        if (humid == null) return { text: '...', color: '#ccc' };
        // 습도는 낮을수록 산불 위험이 높음
        if (humid <= 20) return { text: '위험', color: '#FF4D4F' };
        if (humid <= 40) return { text: '주의', color: '#FAAD14' };
        return { text: '양호', color: '#52C41A' };
    };

    // 3. 배터리 상태 (임의 기준: 20% 이하 주의, 10% 이하 위험)
    const getBatteryStatus = (battery: number) => {
        if (battery == null) return { text: '...', color: '#ccc' };
        if (battery <= 10) return { text: '위험', color: '#FF4D4F' };
        if (battery <= 20) return { text: '주의', color: '#FAAD14' };
        return { text: '양호', color: '#52C41A' };
    };

    // 4. 신고 상태 (1개라도 있으면 접수)
    const getEmergencyStatus = (count: number) => {
        if (count == null) return { text: '...', color: '#ccc' };
        if (count > 0) return { text: '신고 접수', color: '#FF4D4F' }; // 빨강
        return { text: '양호', color: '#52C41A' }; // 초록
    };

    // 현재 데이터 기준으로 상태 값 계산
    const tempStatus = getTempStatus(latestData?.Temp);
    const humidStatus = getHumidStatus(latestData?.Humidity);
    const batteryStatus = getBatteryStatus(latestData?.Battery_Persent);
    const emergencyStatus = getEmergencyStatus(latestData?.Emergency);

    return (
        <S.Root>
            {/* 온도 카드 */}
            <S.CardRoot>
                <S.CardTitle>온도</S.CardTitle>
                <S.CardData>
                    <span>{latestData ? latestData.Temp : '...'}</span>
                    <span>°C</span>
                </S.CardData>
                <S.CardStatus>
                    {/* style 속성으로 배경색을 직접 지정합니다 */}
                    <S.StatusBadge style={{ backgroundColor: tempStatus.color }}>{tempStatus.text}</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>

            {/* 습도 카드 */}
            <S.CardRoot>
                <S.CardTitle>습도</S.CardTitle>
                <S.CardData>
                    <span>{latestData ? latestData.Humidity : '...'}</span>
                    <span>%</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge style={{ backgroundColor: humidStatus.color }}>{humidStatus.text}</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>

            {/* 배터리 카드 */}
            <S.CardRoot>
                <S.CardTitle>배터리 잔량</S.CardTitle>
                <S.CardData>
                    <span>{latestData ? latestData.Battery_Persent : '...'}</span>
                    <span>%</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge style={{ backgroundColor: batteryStatus.color }}>{batteryStatus.text}</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>

            {/* 신고 카드 */}
            <S.CardRoot>
                <S.CardTitle>신고</S.CardTitle>
                <S.CardData>
                    <span>{latestData ? latestData.Emergency : '...'}</span>
                    <span>개</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge style={{ backgroundColor: emergencyStatus.color }}>
                        {emergencyStatus.text}
                    </S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>
        </S.Root>
    );
}
