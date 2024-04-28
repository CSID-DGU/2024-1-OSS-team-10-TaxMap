import React, { useEffect, useRef } from "react";
import "./MapContent.css";

function MapContent() {
  const mapContainerRef = useRef(null); // DOM에 접근하기 위한 ref 객체 생성

  useEffect(() => {
    // 스크립트 로드 후 kakao.map 객체 접근 및 지도 로드, autofalse로 자동 로드 방지
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script); // index.html의 script에 추가되는 것인가?

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 입력값 없을 경우, '동국대 신공학관'  위도 경도에 좌표 표시
        const options = {
          center: new window.kakao.maps.LatLng(
            37.55805491922956,
            126.99832780535394
          ),
          level: 4,
        };
        // ref 객체로 DOM 요소에 접근하여 지도 생성
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
      });
    };
  }, []);

  return <div ref={mapContainerRef} className="map-container"></div>;
}
export default MapContent;
