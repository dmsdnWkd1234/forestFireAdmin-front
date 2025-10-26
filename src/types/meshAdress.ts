export const meshAdressArray = [
    { id: 1, name: '초안산 입구', unicast_address: 8, lat: 37.6327, lng: 127.0549 },
    { id: 2, name: '초안산 등산로', unicast_address: 7, lat: 37.632985, lng: 127.054644 },
    { id: 3, name: '초안산 등산로1', unicast_address: 16, lat: 37.633011, lng: 127.054693 },
    { id: 4, name: '초안산 등산로2', unicast_address: 10, lat: 37.63298, lng: 127.054856 },
];

export interface meshAdress {
    id: number;
    lat: number;
    lng: number;
    name: string;
    unicast_address: number;
}
