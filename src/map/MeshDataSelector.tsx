import * as S from '../style/mesh/MeshDataSelector';

export default function MeshDataSelector() {
    const meshArray = ['전체', '온도', '습도', '이산화탄소', '배터리', '기압', 'TVOC', '전압'];
    const meshArraySection = ['전체', '온도', '습도', '이산화탄소'];
    const meshArraySection2 = ['배터리', '기압', 'TVOC', '전압'];
    return (
        <>
            <S.Root active="전체">
                {meshArray.map((data) => (
                    <S.MobileArray>
                        <S.MobileArraySection>
                            <S.MeshDataTile>{data}</S.MeshDataTile>
                        </S.MobileArraySection>
                    </S.MobileArray>
                ))}
            </S.Root>
        </>
    );
}
