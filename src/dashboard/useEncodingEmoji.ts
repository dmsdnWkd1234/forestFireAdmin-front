const svgString =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">' +
    '<text x="20" y="32" font-size="30" text-anchor="middle" dominant-baseline="middle">📍</text>' +
    '</svg>';

// 2. SVG 문자열을 URL 인코딩하여 데이터 URI로 만듭니다.
const markerIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);

// 3. Marker의 icon prop에 전달할 객체를 만듭니다.
export const getEmojiMarkerIcon = () => {
    // window.google.maps가 로드되었는지 확인
    // (LoadScript가 완료되기 전에 이 함수가 호출될 수 있으므로)
    if (!window.google || !window.google.maps) {
        return undefined;
    }

    // 3. 단순 객체가 아닌, Google Maps 클래스 인스턴스로 생성하여 반환
    return {
        url: markerIconUrl,
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40),
    };
};
