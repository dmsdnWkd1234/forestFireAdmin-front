import * as S from '../style/mesh/MeshDataSelector';

export default function MeshDataSelector() {
    const meshArray = ['온도', '습도', '이산화탄소', '배터리', '기압'];
    return (
        <>
            <S.Root>
                {meshArray.map((data) => (
                    <>
                        <S.MeshDataTile>{data}</S.MeshDataTile>
                    </>
                ))}
            </S.Root>
        </>
    );
}
