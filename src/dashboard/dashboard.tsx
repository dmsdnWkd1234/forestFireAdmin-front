import { useState } from 'react';
// 1. 위에서 만든 훅 import
import useDashHandler from './useDataHandler';
import * as S from '../style/dashboard/style';
import DataCard from './DataCard';
import MeshSelectorMap from './MeshSelectorMap';
import ChartBox from './ChartBox';
import MeshStatus from './MeshStatus';

export default function MyDashboardChart() {
    // 2. 현재 선택된 데이터 유형을 state로 관리 (기본값: 'Temp')
    const [selectedType, setSelectedType] = useState<any>('Temp');
    const [selectedMesh, setSelectedMesh] = useState(null);

    // 3. 훅에 현재 선택된 state(selectedType)를 전달
    // (버튼을 눌러 selectedType이 바뀌면 훅이 자동으로 데이터를 다시 가공함)
    const { data: chartData } = useDashHandler(selectedType);

    return (
        <S.RootContainerStyle>
            <S.SectionRoot height="20%">
                <DataCard selectedMesh={selectedMesh}></DataCard>
            </S.SectionRoot>
            <S.SectionRoot height="35%">
                <S.flex>
                    <MeshSelectorMap onMeshSelect={setSelectedMesh} selectedMesh={selectedMesh}></MeshSelectorMap>
                    <MeshStatus></MeshStatus>
                </S.flex>
            </S.SectionRoot>
            <S.SectionRoot height="50%">
                <ChartBox></ChartBox>
            </S.SectionRoot>
        </S.RootContainerStyle>
    );
}
