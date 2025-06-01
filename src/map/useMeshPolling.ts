import { useState, useEffect } from 'react';
import { MeshData } from '../types/mesh';

const useMeshPolling = (unicast_adress: number | null, interval = 30000) => {
    const [meshData, setMeshData] = useState<MeshData | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchMesh = async () => {
            try {
                const res = await fetch(`http://localhost:3002/mesh/${unicast_adress}`);
                if (!res.ok) throw new Error('서버 응답 실패');
                const data = await res.json();
                if (isMounted) setMeshData(data[0]);
            } catch (err) {
                if (isMounted) setError(err.message);
                console.error('🔥 메쉬 불러오기 실패:', err);
            }
        };

        fetchMesh(); // 첫 fetch

        const intervalId = setInterval(() => {
            fetchMesh();
        }, interval);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [unicast_adress, interval]);
    return { meshData, error };
};

export default useMeshPolling;
