export const meshAdressArray = [
    { id: 1, name: '초안산 등산로1', unicast_address: 5, lat: 37.633, lng: 127.0545 },
    { id: 2, name: '초안산 등산로2', unicast_address: 6, lat: 37.633896523119645, lng: 127.05512516381228 },
    { id: 3, name: '초안산 등산로3', unicast_address: 7, lat: 37.63388945154317, lng: 127.05579358259173 },

    { id: 4, name: '초안산 등산로4', unicast_address: 9, lat: 37.633385198100406, lng: 127.05515877352576 },
    { id: 5, name: '초안산 등산로5', unicast_address: 10, lat: 37.632808977273434, lng: 127.05427468121877 },
    { id: 6, name: '초안산 등산로6', unicast_address: 12, lat: 37.63311509246402, lng: 127.05475072617543 },

    { id: 7, name: '초안산 등산로7', unicast_address: 13, lat: 37.63321387282084, lng: 127.05545320395493 },
    { id: 8, name: '초안산 등산로8', unicast_address: 14, lat: 37.63249378822337, lng: 127.05393458172988 },
    { id: 9, name: '초안산 등산로9', unicast_address: 17, lat: 37.632160501152235, lng: 127.05376440648784 },

    { id: 10, name: '초안산 등산로10', unicast_address: 18, lat: 37.632818266953265, lng: 127.05366291885139 },
    { id: 11, name: '초안산 등산로11', unicast_address: 21, lat: 37.63326863048337, lng: 127.05394647086284 },
    { id: 12, name: '초안산 등산로12', unicast_address: 22, lat: 37.633683073360864, lng: 127.05396942884585 },

    { id: 13, name: '초안산 등산로13', unicast_address: 23, lat: 37.63323170550208, lng: 127.05584973642475 },
    { id: 14, name: '은봉관 실시간 감지', unicast_address: 24, lat: 37.631338247063624, lng: 127.05399322299232 },
    { id: 15, name: '초안산 등산로15', unicast_address: 25, lat: 37.6339, lng: 127.0545 },
];

export interface meshAdress {
    id: number;
    lat: number;
    lng: number;
    name: string;
    unicast_address: number;
}
