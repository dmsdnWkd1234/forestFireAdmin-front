import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import bat100 from './assets/bat100.svg';
import halfBat from './assets/halfBat.svg';
import nobat from './assets/noBat.svg';

const containerStyle = {
    width: '1300px',
    height: '522px',
    marginTop: '15px',
};

const center = {
    lat: 37.632239,
    lng: 127.05501,
};

// Mesh 위치 데이터 (예시)
const meshLocations = [
    { id: 1, name: '도서관', lat: 37.632239, lng: 127.05501, temp: 37.5, battery: 80 },
    { id: 2, name: '2공학관', lat: 37.632829, lng: 127.055635, temp: 37.5, battery: 30 },
    { id: 3, name: '식당', lat: 37.629751, lng: 127.055557, temp: 37.5, battery: 0 },
];

const batteryStatus = (battery: number) => {
    if (battery >= 80) {
        return bat100;
    } else if (battery < 80 && battery >= 20) {
        return halfBat;
    } else {
        return nobat;
    }
};

const GoogleMapComponent: React.FC = () => {
    const [selectedMesh, setSelectedMesh] = useState<null | {
        id: number;
        name: string;
        lat: number;
        lng: number;
        temp: number;
        battery: number;
    }>();
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                {meshLocations.map((mesh) => (
                    <Marker
                        key={mesh.lat}
                        position={{ lat: mesh.lat, lng: mesh.lng }}
                        icon={{ url: batteryStatus(mesh.battery) }}
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
                            <h3>name : {selectedMesh.name}</h3>
                            <h3>temp : {selectedMesh.temp}</h3>
                            <h3>battery : {selectedMesh.battery}</h3>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
