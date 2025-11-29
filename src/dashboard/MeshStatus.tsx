import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/meshStatus';
import { meshAdressArray } from '../types/meshAdress';

const TEMP_LIMIT = 40;
const BATTERY_LIMIT = 20;

const getMeshName = (unicastAddress: any) => {
    const mesh = meshAdressArray.find((m) => m.unicast_address == unicastAddress);
    return mesh ? mesh.name : `Unknown (${unicastAddress})`;
};

const getIssueDetails = (item: any) => {
    if (item.Emergency > 0) return { icon: '🚨', text: '신고 접수', color: '#ff4d4f' };
    if (item.Temp >= TEMP_LIMIT) return { icon: '🔥', text: '온도 높음', color: '#fa8c16' };
    if (item.Battery_Persent <= BATTERY_LIMIT) return { icon: '⛔', text: '배터리 낮음', color: '#faad14' };
    return { icon: '❓', text: '확인 필요', color: '#8c8c8c' };
};

export default function MeshStatus() {
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/dashboard/abnormal`)
            .then((res) => res.json())
            .then((abnormalData) => {
                const processedIssues = abnormalData.map((item: any) => {
                    const details = getIssueDetails(item);
                    const name = getMeshName(item.unicast_address);

                    // 시간 포맷팅: "2024-11-29T14:30:00" -> "11-29 14:30" (연도와 초 제거)
                    const shortTime = item.Time ? item.Time.substring(5, 16).replace('T', ' ') : '';

                    return {
                        key: `${item.unicast_address}-${item.Time}`,
                        icon: details.icon,
                        name: name,
                        reason: details.text,
                        color: details.color, // 색상 정보 추가
                        unicast_address: item.unicast_address,
                        Time: shortTime,
                    };
                });

                setIssues(processedIssues);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('이슈 데이터 로딩 실패:', err);
                setIsLoading(false);
            });
    }, []);

    return (
        <S.Root>
            <S.ContentBox>
                <S.Title>
                    이슈 현황 <span>Total: {issues.length}</span>
                </S.Title>
                <S.ListBox>
                    {isLoading && <S.EmptyState>로딩 중...</S.EmptyState>}

                    {!isLoading && issues.length === 0 && (
                        <S.EmptyState>
                            <span>✅</span> 현재 이슈가 없습니다.
                        </S.EmptyState>
                    )}

                    {!isLoading &&
                        issues.map((issue: any) => (
                            <S.ListItem key={issue.key}>
                                {/* 좌측 그룹: 아이콘 + ID + 이름 */}
                                <S.InfoGroup>
                                    <S.Icon>{issue.icon}</S.Icon>
                                    {/* 모바일에서는 ID 숨김 처리 (style에서 제어) */}
                                    <S.DeviceId>[No.{issue.unicast_address}]</S.DeviceId>
                                    <S.DeviceName>{issue.name}</S.DeviceName>
                                </S.InfoGroup>

                                {/* 우측 그룹: 이슈내용 + 시간 */}
                                <S.StatusGroup>
                                    {/* 이슈 내용은 모바일에서 말줄임 처리됨 */}
                                    <S.IssueText color={issue.color}>{issue.reason}</S.IssueText>
                                    <S.TimeText>{issue.Time}</S.TimeText>
                                </S.StatusGroup>
                            </S.ListItem>
                        ))}
                </S.ListBox>
            </S.ContentBox>
        </S.Root>
    );
}
