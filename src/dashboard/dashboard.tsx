import { useState } from 'react';
// 1. 위에서 만든 훅 import
import * as S from '../style/dashboard/style';
import DataCard from './DataCard';
import MeshSelectorMap from './MeshSelectorMap';
import ChartBox from './ChartBox';
import MeshStatus from './MeshStatus';

export default function Dashboard() {
    // 2. 현재 선택된 데이터 유형을 state로 관리 (기본값: 'Temp')
    const [selectedMesh, setSelectedMesh] = useState(null);

    // 3. 훅에 현재 선택된 state(selectedType)를 전달
    // (버튼을 눌러 selectedType이 바뀌면 훅이 자동으로 데이터를 다시 가공함)
    return (
        <S.RootContainerStyle>
            <S.SectionRoot height="25%">
                <DataCard selectedMesh={selectedMesh}></DataCard>
            </S.SectionRoot>
            <S.SectionRoot height="30%">
                <S.flex>
                    <MeshSelectorMap onMeshSelect={setSelectedMesh} selectedMesh={selectedMesh}></MeshSelectorMap>
                    <MeshStatus></MeshStatus>
                </S.flex>
            </S.SectionRoot>
            <S.SectionRoot height="33%">
                <ChartBox selectedMesh={selectedMesh}></ChartBox>
            </S.SectionRoot>
        </S.RootContainerStyle>
    );
}
