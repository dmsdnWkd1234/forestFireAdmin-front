import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import * as S from '../style/dashboard/meshSelectorMap';
import { center, style } from './mapSetting';
import { meshAdressArray } from '../types/meshAdress';
import { useMemo, useState } from 'react';
import { getEmojiMarkerIcon } from './useEncodingEmoji';

export default function MeshSelectorMap({ selectedMesh, onMeshSelect }: { selectedMesh: any; onMeshSelect: any }) {
    const [position, setPosition] = useState<any>({ id: 0, name: '', unicast_address: 0, lat: 0, lng: 0 });
    const emojiMarkerIcon = useMemo(() => {
        return getEmojiMarkerIcon();
    }, []);
    return (
        <S.Root>
            <S.MapTitle>
                <span>메시 선택기</span>
            </S.MapTitle>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={style} center={center} zoom={18}>
                    {meshAdressArray.map((mesh) => {
                        // 미리 계산된 옵션 가져오기
                        return (
                            <Marker
                                key={mesh.id}
                                position={{ lat: mesh.lat, lng: mesh.lng }}
                                onClick={() => {
                                    setPosition(mesh);
                                    onMeshSelect(mesh);
                                }}
                                icon={emojiMarkerIcon}
                            />
                        );
                    })}
                    {selectedMesh && (
                        <InfoWindow
                            position={{ lat: selectedMesh.lat, lng: selectedMesh.lng }}
                            onCloseClick={() => {
                                onMeshSelect(null);
                            }}
                        >
                            <div>
                                <h4>{selectedMesh.name}</h4>

                                <p>Unicast_address: {selectedMesh.unicast_address}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </S.Root>
    );
}
