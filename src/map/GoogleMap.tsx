import React, { useState, useMemo } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import MeshDataSelector from './MeshDataSelector';
import useMeshPolling from './useMeshPolling'; // (기존) InfoWindow용
import useAllMeshPolling from './useAllMeshPolling'; // (신규) 전체 마커용
import { meshAdressArray } from '../types/meshAdress';
import * as S from '../style/map/style';
import type { meshAdress } from '../types/meshAdress'; // (가상) 타입
import { center, containerStyle, EMOJI_MAP } from './mapSettiong';
// as const로 타입을 명확히 함
type EmojiFilterKey = keyof typeof EMOJI_MAP;

const meshAdress: meshAdress[] = meshAdressArray;

const GoogleMapComponent: React.FC = () => {
    // 1. InfoWindow용 (기존 훅 사용)
    const [selectedMesh, setSelectedMesh] = useState<meshAdress | null>(null);
    // 변수명 충돌 방지: meshData -> selectedMeshData
    const { meshData: selectedMeshData, error: selectedMeshError } = useMeshPolling(
        selectedMesh?.unicast_address ?? null
    );

    // 2. 전체 마커 필터용 (신규 훅 사용)
    const [activeFilter, setActiveFilter] = useState('기본');
    const { allData, error: allDataError } = useAllMeshPolling();

    // 3. 마커 옵션 동적 생성 (useMemo로 최적화)
    // ... (GoogleMapComponent 함수 내부) ...

    const markerOptions = useMemo(() => {
        const options = new Map<number, { icon?: google.maps.Icon; label?: google.maps.MarkerLabel }>();

        // ▼▼▼ [수정됨] ▼▼▼
        // 1. 'google' 객체가 로드되지 않았거나 '전체'가 선택되면 즉시 기본값 반환
        if (typeof google === 'undefined' || !google.maps || activeFilter === '전체') {
            return options;
        }

        // 2. [여기부터] 'google' 객체가 안전하게 보장된 영역입니다.
        // 아이콘 생성 함수를 useMemo *내부*로 이동
        const createEmojiIcon = (emoji: string): google.maps.Icon => {
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="30">
                        ${emoji}
                    </text>
                </svg>
            `;
            const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
            return {
                url: url,
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20),
                labelOrigin: new google.maps.Point(20, -5),
            };
        };

        // 3. 현재 필터에 맞는 아이콘 객체 생성
        const currentEmoji = EMOJI_MAP[activeFilter as EmojiFilterKey];
        const currentIcon = currentEmoji ? createEmojiIcon(currentEmoji) : undefined;
        // ▲▲▲ [수정 완료] ▲▲▲

        for (const mesh of meshAdress) {
            const data = allData.get(mesh.unicast_address);
            let icon: google.maps.Icon | undefined = currentIcon; // 미리 만든 아이콘 적용
            let label: google.maps.MarkerLabel | undefined = undefined;

            if (data) {
                // 라벨(값)만 설정
                switch (activeFilter) {
                    case '기본':
                        label = { text: `${mesh.name}`, className: 'marker-label' };
                        break;
                    case '온도':
                        label = { text: `${data.Temp}°C`, className: 'marker-label' };
                        break;
                    case '습도':
                        label = { text: `${data.Humidity}%`, className: 'marker-label' };
                        break;
                    case '이산화탄소':
                        label = { text: `${data.CO2}ppm`, className: 'marker-label' };
                        break;
                    case '배터리':
                        label = { text: `${data.Battery_Persent}%`, className: 'marker-label' };
                        break;
                    case '기압':
                        label = { text: `${data.Pressure}hPa`, className: 'marker-label' };
                        break;
                    case 'TVOC':
                        label = { text: `${data.TVOC}ppb`, className: 'marker-label' };
                        break;
                    case '전압':
                        label = { text: `${data.Voltage}V`, className: 'marker-label' };
                        break;
                    default:
                        icon = undefined; // '전체'는 이미 위에서 처리됨
                        label = undefined;
                }
            } else {
                // 데이터가 없는 메쉬는 기본 아이콘 사용
                icon = undefined;
            }
            options.set(mesh.unicast_address, { icon, label });
        }
        return options;
    }, [activeFilter, allData]); // 의존성 배열은 그대로

    return (
        <S.RootContainer>
            {/* 상태와 세터(setter)를 props로 전달 */}
            <MeshDataSelector activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <S.MapWrapper>
                <S.TitleBar>
                    <S.TitleBarText>Mesh Data Map</S.TitleBarText>
                </S.TitleBar>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
                        {meshAdress.map((mesh) => {
                            // 미리 계산된 옵션 가져오기
                            const options = markerOptions.get(mesh.unicast_address);

                            return (
                                <Marker
                                    key={mesh.id}
                                    position={{ lat: mesh.lat, lng: mesh.lng }}
                                    onClick={() => setSelectedMesh(mesh)}
                                    // '전체'가 선택되면 options가 undefined이므로 기본 마커가 표시됨
                                    icon={options?.icon}
                                    label={options?.label}
                                />
                            );
                        })}

                        {/* InfoWindow 로직은 기존과 동일 (selectedMeshData, selectedMeshError 사용) */}
                        {selectedMesh && (
                            <InfoWindow
                                position={{ lat: selectedMesh.lat, lng: selectedMesh.lng }}
                                onCloseClick={() => setSelectedMesh(null)}
                                options={{
                                    pixelOffset:
                                        typeof google !== 'undefined' && google.maps
                                            ? new google.maps.Size(0, -40)
                                            : undefined,
                                }}
                            >
                                <div>
                                    <h3>📡 Name: {selectedMesh.name}</h3>
                                    {selectedMeshError ? (
                                        <p>❌ 데이터 로딩 실패</p>
                                    ) : selectedMeshData ? ( // selectedMeshData 사용!
                                        <>
                                            <p>🛰️UA: {selectedMeshData.unicast_address}</p>
                                            <p>🌡️ Temp: {selectedMeshData.Temp}°C</p>
                                            <p>💧 Humi: {selectedMeshData.Humidity}%</p>
                                            <p>💨 CO2: {selectedMeshData.CO2} ppm</p>
                                            <p>🧪TVOC: {selectedMeshData.TVOC} ppb</p>
                                            <p>📈 Pressure: {selectedMeshData.Pressure} hPa</p>
                                            <p>🔋 Battery: {selectedMeshData.Battery_Persent}%</p>
                                            <p>⚡ Voltage: {selectedMeshData.Voltage} V</p>
                                            <p>🕒 Time: {new Date(selectedMeshData.Time).toLocaleString()}</p>
                                        </>
                                    ) : (
                                        <p>⏳ 로딩 중...</p>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </S.MapWrapper>
        </S.RootContainer>
    );
};

export default GoogleMapComponent;
