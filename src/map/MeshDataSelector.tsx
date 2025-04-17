import * as S from '../style/mesh/MeshDataSelector';

import { useEffect, useState } from 'react';

export default function MeshDataSelector() {
    const [dataSelector, setDataSelector] = useState();
    const meshArray = ['온도', '습도', '이산화탄소', 'ㅇ', 'ㅇ', 'ㅇ'];
    return (
        <>
            <S.Root>
                {meshArray.map((data, no) => (
                    <>
                        <S.MeshDataTile>{data}</S.MeshDataTile>
                    </>
                ))}
            </S.Root>
        </>
    );
}
