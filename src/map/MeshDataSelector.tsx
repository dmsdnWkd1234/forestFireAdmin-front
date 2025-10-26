import * as S from '../style/mesh/MeshDataSelector';

// 부모로부터 받을 props 타입 정의
interface MeshDataSelectorProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

// props로 activeFilter와 setActiveFilter를 받음
export default function MeshDataSelector({ activeFilter, setActiveFilter }: MeshDataSelectorProps) {
    const meshArray = ['기본', '온도', '습도', '이산화탄소', '배터리', '기압', 'TVOC', '전압'];

    return (
        <>
            {/* S.Root에는 현재 활성화된 필터 이름을 전달 (스타일링용) */}
            <S.Root active={activeFilter}>
                {meshArray.map((data) => (
                    // <></> 불필요한 Fragment 제거
                    <S.MeshDataTile
                        key={data}
                        // 클릭 시 부모의 상태(activeFilter) 변경
                        onClick={() => setActiveFilter(data)}
                        // 현재 활성화된 버튼인지 여부를 active prop으로 전달 (스타일링용)
                        active={activeFilter === data}
                    >
                        {data ? data : data[0]}
                    </S.MeshDataTile>
                ))}
            </S.Root>
        </>
    );
}
