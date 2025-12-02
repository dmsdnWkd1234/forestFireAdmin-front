import React, { useState, useMemo } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import MeshDataSelector from './MeshDataSelector';
import useMeshPolling from './useMeshPolling'; // (기존) InfoWindow용
import useAllMeshPolling from './useAllMeshPolling'; // (신규) 전체 마커용
import { meshAdressArray } from '../types/meshAdress';
import * as S from '../style/map/style';
import type { meshAdress } from '../types/meshAdress';
import { center, containerStyle, EMOJI_MAP } from './mapSettiong';

// as const로 타입을 명확히 함
type EmojiFilterKey = keyof typeof EMOJI_MAP;

const meshAdress: meshAdress[] = meshAdressArray;

const GoogleMapComponent: React.FC = () => {
    // 1. InfoWindow용 (선택된 마커 polling)
    const [selectedMesh, setSelectedMesh] = useState<meshAdress | null>(null);
    const { meshData: selectedMeshData, error: selectedMeshError } = useMeshPolling(
        selectedMesh?.unicast_address ?? null
    );

    // 2. 전체 마커 필터용 (전체 데이터 polling)
    const [activeFilter, setActiveFilter] = useState('기본');
    const { allData } = useAllMeshPolling(); // error 처리는 필요시 추가

    // 3. 마커 옵션 동적 생성
    const markerOptions = useMemo(() => {
        const options = new Map<number, { icon?: google.maps.Icon; label?: google.maps.MarkerLabel }>();

        // '전체' 모드이거나 google 객체가 없으면 기본 마커 사용
        if (typeof google === 'undefined' || !google.maps || activeFilter === '전체') {
            return options;
        }

        // [함수 1] 이모지 아이콘 생성기
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

        // [함수 2] CCTV 아이콘 생성기 (24번 전용)
        const createCCTVIcon = (): google.maps.Icon => {
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#d32f2f">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
            `;
            return {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20),
                labelOrigin: new google.maps.Point(20, 40), // 라벨을 아이콘 아래로 내림
            };
        };

        // 현재 필터에 맞는 기본 아이콘 생성
        const currentEmoji = EMOJI_MAP[activeFilter as EmojiFilterKey];
        const currentIcon = currentEmoji ? createEmojiIcon(currentEmoji) : undefined;

        // CCTV 아이콘 생성
        const cctvIcon = createCCTVIcon();

        for (const mesh of meshAdress) {
            const data = allData.get(mesh.unicast_address);

            // 1. 아이콘 결정 로직
            let icon: google.maps.Icon | undefined;

            if (mesh.unicast_address === 24) {
                // 24번은 무조건 CCTV 아이콘
                icon = cctvIcon;
            } else {
                // 나머지는 필터에 따른 이모지 아이콘
                icon = currentIcon;
            }

            // 2. 라벨 결정 로직
            let label: google.maps.MarkerLabel | undefined = undefined;

            if (data) {
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
                        // 필터가 특수 모드가 아닐 때, 24번이 아니면 아이콘/라벨 숨김 (undefined)
                        if (mesh.unicast_address !== 24) {
                            icon = undefined;
                        }
                        label = undefined;
                }
            } else {
                // 데이터가 없을 때
                // 24번은 CCTV 아이콘 유지, 나머지는 기본 핀(또는 숨김) 처리
                if (mesh.unicast_address !== 24) {
                    icon = undefined;
                }
            }

            options.set(mesh.unicast_address, { icon, label });
        }
        return options;
    }, [activeFilter, allData]);

    return (
        <S.RootContainer>
            <MeshDataSelector activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <S.MapWrapper>
                <S.TitleBar>
                    <S.TitleBarText>Mesh Data Map</S.TitleBarText>
                </S.TitleBar>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
                        {meshAdress.map((mesh) => {
                            const options = markerOptions.get(mesh.unicast_address);

                            return (
                                <Marker
                                    key={mesh.id}
                                    position={{ lat: mesh.lat, lng: mesh.lng }}
                                    onClick={() => setSelectedMesh(mesh)}
                                    icon={options?.icon}
                                    label={options?.label}
                                />
                            );
                        })}

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
                                    ) : selectedMeshData ? (
                                        <>
                                            <p>🛰️ UA: {selectedMeshData.unicast_address}</p>
                                            <p>🌡️ Temp: {selectedMeshData.Temp}°C</p>
                                            <p>💧 Humi: {selectedMeshData.Humidity}%</p>
                                            <p>💨 CO2: {selectedMeshData.CO2} ppm</p>
                                            <p>🧪 TVOC: {selectedMeshData.TVOC} ppb</p>
                                            <p>📈 Pressure: {selectedMeshData.Pressure} hPa</p>
                                            <p>🔋 Battery: {selectedMeshData.Battery_Persent}%</p>
                                            <p>⚡ Voltage: {selectedMeshData.Voltage} V</p>
                                            <p>🕒 Time: {selectedMeshData.Time.split('.')[0].replace('T', ' ')}</p>
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
