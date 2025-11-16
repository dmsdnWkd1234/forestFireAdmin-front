import { useEffect, useState } from 'react';
import * as S from '../style/dashboard/meshStatus';
// 1. 맵(MeshSelectorMap)에서 사용했던 메시 주소/이름 데이터를 import 합니다.
// (경로가 다를 수 있으니 실제 파일 위치를 확인하세요)
import { meshAdressArray } from '../types/meshAdress';

// 2. 백엔드 API에서 설정한 기준값과 동일하게 프론트에도 기준을 정합니다.
const TEMP_LIMIT = 40;
const BATTERY_LIMIT = 20;

/**
 * unicast_address(숫자)를 "6번 초안산 입구" (이름)로 변환하는 헬퍼 함수
 */
const getMeshName = (unicastAddress: any) => {
    // meshAdressArray에서 일치하는 주소의 이름을 찾습니다.
    // DB의 unicast_address가 문자열("8")일 수 있으므로 '==' 비교
    const mesh = meshAdressArray.find((m) => m.unicast_address == unicastAddress);
    return mesh ? mesh.name : `알 수 없는 기기 (${unicastAddress})`;
};

/**
 * API 데이터를 기반으로 이슈 아이콘과 텍스트를 반환하는 헬퍼 함수
 */
const getIssueDetails = (item: any) => {
    // 1순위: 신고 (Emergency)
    if (item.Emergency > 0) {
        return { icon: '🚨', text: '신고 접수' }; // 🚨 (긴급)
    }
    // 2순위: 온도 (Temp)
    if (item.Temp >= TEMP_LIMIT) {
        return { icon: '🔥', text: '온도 높음' }; // 🔥 (온도)
    }
    // 3순위: 배터리 (Battery_Persent)
    if (item.Battery_Persent <= BATTERY_LIMIT) {
        return { icon: '⛔', text: '배터리 낮음' }; // ⛔ (배터리)
    }

    // API 로직과 일치한다면 이 부분은 실행되지 않아야 합니다.
    return { icon: '❓', text: '기타 확인 필요' };
};

export default function MeshStatus() {
    // 3. API로 받아온 이슈 목록을 저장할 state
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 4. 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/dashboard/abnormal`) // 백엔드에서 만든 API 엔드포인트
            .then((res) => res.json())
            .then((abnormalData) => {
                // 5. 받아온 데이터를 "가공"
                const processedIssues = abnormalData.map((item: any) => {
                    const details = getIssueDetails(item);
                    const name = getMeshName(item.unicast_address);

                    return {
                        // key로 사용할 고유값 (Time이 적절해 보임)
                        key: `${item.unicast_address}-${item.Time}`,
                        icon: details.icon,
                        name: name,
                        reason: details.text,
                        unicast_address: item.unicast_address,
                    };
                });

                setIssues(processedIssues); // 가공된 데이터를 state에 저장
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('이슈 데이터 로딩 실패:', err);
                setIsLoading(false);
            });
    }, []); // 빈 배열: 처음 1회만 실행

    return (
        <S.Root>
            <S.ContentBox>
                <S.Title>
                    이슈 <span>{issues.length}개의 이슈가 있습니다</span>
                </S.Title>
                <S.ListBox>
                    {/* 6. 로딩 중일 때 */}
                    {isLoading && (
                        <S.List>
                            <span>로딩 중...</span>
                        </S.List>
                    )}

                    {/* 7. 로딩 끝났는데 이슈가 없을 때 */}
                    {!isLoading && issues.length === 0 && (
                        <S.List>
                            <span>✅</span>
                            <span> 현재 이슈 없음</span>
                        </S.List>
                    )}

                    {/* 8. 로딩 끝났고 이슈가 있을 때 (map으로 동적 렌더링) */}
                    {!isLoading &&
                        issues.map((issue: any) => (
                            <S.List key={issue.key}>
                                {/* 아이콘 */}
                                <span style={{ fontSize: '1.2rem' }}>{issue.icon}</span>

                                {/* 2. 유니캐스트 주소 표시 (강조를 위해 굵게/색상 변경 가능) */}
                                <span style={{ color: '#888', fontSize: '0.9rem' }}>[No.{issue.unicast_address}]</span>

                                {/* 기기 이름 */}
                                <span style={{ fontWeight: 'bold' }}>{issue.name}</span>

                                {/* 이슈 내용 */}
                                <span style={{ color: '#d32f2f' }}>: {issue.reason}</span>
                            </S.List>
                        ))}
                </S.ListBox>
            </S.ContentBox>
        </S.Root>
    );
}
