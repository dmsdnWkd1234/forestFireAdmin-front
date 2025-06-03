import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import bat100 from '../assets/battery/bat100.svg';
import halfBat from '../assets/battery/halfBat.svg';
import nobat from '../assets/battery/noBat.svg';
import MeshDataSelector from './MeshDataSelector';
import useMeshPolling from './useMeshPolling';
import { meshAdressArray } from '../meshAdress';

const containerStyle = {
    width: '1600px',
    height: '522px',
    marginTop: '15px',
};

const center = {
    lat: 37.632239,
    lng: 127.05501,
};

const batteryStatus = (battery?: number): string => {
    if (typeof battery !== 'number') return nobat;
    if (battery >= 80) return bat100;
    if (battery >= 20) return halfBat;
    return nobat;
};

const meshAdress = meshAdressArray;

const GoogleMapComponent: React.FC = () => {
    const [selectedMesh, setSelectedMesh] = useState<null | {
        id: number;
        unicast_address: number;
        name: string;
        lat: number;
        lng: number;
    }>();

    const { meshData, error } = useMeshPolling(selectedMesh?.unicast_address ?? null);

    const [batteryIcon, setBatteryIcon] = useState(nobat);

    useEffect(() => {
        if (typeof meshData?.Battery_Persent === 'number') {
            setBatteryIcon(batteryStatus(meshData.Battery_Persent));
        }
    }, [meshData?.Battery_Persent]);

    return (
        <div>
            <MeshDataSelector></MeshDataSelector>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                    {meshAdress.map((mesh) => (
                        <Marker
                            key={mesh.lat}
                            position={{ lat: mesh.lat, lng: mesh.lng }}
                            onClick={() => setSelectedMesh(mesh)} // 클릭 시 InfoWindow 표시
                        />
                    ))}

                    {/* 선택된 Mesh가 있을 때만 InfoWindow 표시 */}
                    {selectedMesh && (
                        <InfoWindow
                            position={{ lat: selectedMesh.lat + 0.0005, lng: selectedMesh.lng }}
                            onCloseClick={() => setSelectedMesh(null)}
                        >
                            <div>
                                <h3>📡 Name: {selectedMesh.name}</h3>
                                {error ? (
                                    <p>❌ 데이터 로딩 실패</p>
                                ) : meshData ? (
                                    <>
                                        <p>🌡️ Temp: {meshData.Temp}°C</p>
                                        <p>💧 Humi: {meshData.Humidity}%</p>
                                        <p>🧪 CO2: {meshData.CO2} ppm</p>
                                        <p>🔥 TVOC: {meshData.TVOC} ppb</p>
                                        <p>📈 Pressure: {meshData.Pressure} hPa</p>
                                        <p>🚨 Emergency: {meshData.Emergency === 1 ? 'YES' : 'NO'}</p>
                                        <p>🔋 Battery: {meshData.Battery_Persent}%</p>
                                        <p>⚡ Voltage: {meshData.Voltage} V</p>
                                        <p>🕒 Time: {meshData.Time}</p>
                                    </>
                                ) : (
                                    <p>⏳ 로딩 중...</p>
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GoogleMapComponent;
