import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/dataCard';

// 1. 부모로부터 selectedMesh를 prop으로 받습니다.
export default function DataCard({ selectedMesh }: { selectedMesh: any }) {
    // 2. API로부터 받아온 최신 데이터를 저장할 state
    const [latestData, setLatestData] = useState<any>(null);

    // 3. selectedMesh prop이 변경될 때마다 이 Effect가 실행됩니다.
    useEffect(() => {
        // 4. selectedMesh가 null이 아니면(즉, 마커가 선택되면) 데이터 fetch
        if (selectedMesh) {
            // API는 'id' 키로 unicast_address를 받도록 되어 있었습니다.
            const addressToFetch = selectedMesh.unicast_address;

            fetch(`http://localhost:3002/api/dashboard`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: addressToFetch, // { "id": 16 }
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    // 5. API가 100개짜리 배열을 반환하므로, 가장 최신 데이터(첫 번째)를 사용
                    if (data && data.length > 0) {
                        setLatestData(data[0]);
                    } else {
                        setLatestData(null); // 데이터가 없는 경우
                    }
                })
                .catch((err) => {
                    console.error('카드 데이터 불러오기 실패:', err);
                    setLatestData(null);
                });
        } else {
            // 6. 선택이 해제되면(selectedMesh가 null이면) 데이터를 비웁니다.
            setLatestData(null);
        }
    }, [selectedMesh]); // 의존성 배열: selectedMesh가 바뀔 때만 실행

    // 7. 렌더링: latestData가 있으면 그 값을, 없으면 '...' (로딩) 표시
    return (
        <S.Root>
            <S.CardRoot>
                <S.CardTitle>온도</S.CardTitle>
                <S.CardData>
                    {/* API 응답의 Temp 키를 사용. (DB 컬럼명 기준) */}
                    <span>{latestData ? latestData.Temp : '...'}</span>
                    <span>°C</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge>양호</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>
            <S.CardRoot>
                <S.CardTitle>습도</S.CardTitle>
                <S.CardData>
                    <span>{latestData ? latestData.Humidity : '...'}</span>
                    <span>%</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge>양호</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>
            <S.CardRoot>
                <S.CardTitle>배터리 잔량</S.CardTitle>
                <S.CardData>
                    {/* API 응답의 Battery_Persent 키를 사용. */}
                    <span>{latestData ? latestData.Battery_Persent : '...'}</span>
                    <span>%</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge>양호</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>
            <S.CardRoot>
                <S.CardTitle>신고</S.CardTitle>
                <S.CardData>
                    {/* API 응답의 Emergency 키를 사용. */}
                    <span>{latestData ? latestData.Emergency : '...'}</span>
                    <span>개</span>
                </S.CardData>
                <S.CardStatus>
                    <S.StatusBadge>양호</S.StatusBadge>
                </S.CardStatus>
            </S.CardRoot>
        </S.Root>
    );
}
