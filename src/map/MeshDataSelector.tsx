import * as S from '../style/mesh/MeshDataSelector';

export default function MeshDataSelector() {
    const meshArray = ['전체', '온도', '습도', '이산화탄소', '배터리', '기압', 'TVOC', '전압'];
    return (
        <>
            <S.Root active="전체">
                {meshArray.map((data) => (
                    <>
                        <S.MeshDataTile>{data}</S.MeshDataTile>
                    </>
                ))}
            </S.Root>
        </>
    );
}
