// src/hooks/useAllMeshPolling.ts (새 파일)

import { useState, useEffect } from 'react';
import { meshAdressArray } from '../types/meshAdress'; // 메쉬 주소 배열
import type { MeshData } from '../types/mesh';

// 반환 타입: Map<메쉬 주소(number), 메쉬 데이터(MeshData)>
type AllDataMap = Map<number, MeshData>;

const POLLING_INTERVAL = 15000; // 5초마다 모든 데이터 갱신

export default function useAllMeshPolling() {
    // Map을 사용하여 <주소, 데이터>로 관리하는 것이 효율적입니다.
    const [allData, setAllData] = useState<AllDataMap>(new Map());
    const [error, setError] = useState<string | null>(null);

    const fetchAllData = async () => {
        try {
            // 모든 메쉬 주소에 대해 fetch 요청을 병렬로 실행
            const promises = meshAdressArray.map(async (mesh) => {
                const res = await fetch(`${import.meta.env.VITE_BACK_URL}api/mesh/${mesh.unicast_address}`);
                if (!res.ok) {
                    throw new Error(`데이터 로드 실패 (ID: ${mesh.unicast_address})`);
                }
                const data: MeshData[] = await res.json(); // API가 배열 반환 가정
                // data[0]에 실제 데이터가 있다고 가정
                return { unicast_address: mesh.unicast_address, data: data[0] };
            });

            const results = await Promise.all(promises);

            // 결과를 새로운 Map으로 구성
            const newDataMap: AllDataMap = new Map();
            results.forEach((item) => {
                if (item.data) {
                    // 데이터가 있는 경우에만 맵에 추가
                    newDataMap.set(item.unicast_address, item.data);
                }
            });

            setAllData(newDataMap);
            setError(null);
        } catch (err: any) {
            console.error('전체 메쉬 데이터 폴링 실패:', err);
            setError(err.message || '데이터 로딩 중 오류 발생');
        }
    };

    useEffect(() => {
        fetchAllData(); // 마운트 시 즉시 실행
        const interval = setInterval(fetchAllData, POLLING_INTERVAL); // 5초마다 반복

        return () => clearInterval(interval); // 언마운트 시 인터벌 정리
    }, []); // 빈 배열로 마운트 시 1회만 실행

    return { allData, error };
}
