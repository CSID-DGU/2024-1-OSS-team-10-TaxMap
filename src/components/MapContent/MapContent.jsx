import React, { useEffect, useRef, useState } from "react";
import "./MapContent.css";
import { fetchBoundaryOrganizations } from "../../services/suggestionService"; // 백엔드 API 호출

function MapContent({ coordinates }) {
  // 사용자가 선택한 장소의 좌표를 props로 받아옴
  const mapContainerRef = useRef(null); // DOM에 접근하기 위한 ref 객체 생성

  // 마커 데이터 저장 (데모)
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // 스크립트 로드 후 kakao.map 객체 접근 및 지도 로드, autofalse로 자동 로드 방지
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script); // index.html의 script에 추가되는 것인가?

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 입력값 없을 경우, 기본 값으로 '동국대 신공학관'  위도 경도에 좌표 표시

        const options = {
          center: new window.kakao.maps.LatLng(
            coordinates ? coordinates.lat : 37.55805491922956, // 사용자 선택 좌표 : 디폴트 좌표(신공학관)
            coordinates ? coordinates.lng : 126.99832780535394
          ),
          level: 4,
        };
        // ref 객체로 DOM 요소에 접근하여 지도 생성
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);

        // 지도 이벤트 리스너 : 사용자의 지도 이동이 끝날 때마다 경계 정보를 백엔드에게 전송
        window.kakao.maps.event.addListener(map, "bounds_changed", async () => {
          const bounds = map.getBounds();
          const swLatLng = bounds.getSouthWest();
          const neLatLng = bounds.getNorthEast();

          // URL 쿼리 문자열을 사용하여 경계 정보 전송 - POST

          try {
            const response = await fetch(
              "http://124.49.226.94:9999/api/map/view",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  minLat: swLatLng.getLat(),
                  maxLat: neLatLng.getLat(),
                  minLng: swLatLng.getLng(),
                  maxLng: neLatLng.getLng(),
                }),
              }
            );
            if (response.ok) {
              const data = await response.json();
              setMarkers(data); // 마커 데이터 저장
              // 이전 마커 삭제 로직 추가 필요
              // 지도에 마커 추가
              data.forEach((markerData) => {
                new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(
                    markerData.latitude,
                    markerData.longitude
                  ),
                  title: markerData.address, // 추가정보 표시 :주소
                });
              });
            } else {
              throw new Error("Failed to fetch markers");
            }
          } catch (error) {
            console.error("Error fetching organizations within bounds:", error);
          }
        });
      });
    };
  }, [coordinates]);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container"></div>
      <div className="marker-list">
        {markers.map((marker, index) => (
          <div key={index}>
            <h4>{marker.address}</h4>
            {marker.organizations.map((org, idx) => (
              <p key={idx}>
                {org.name} - {org.totalReceivedSubsidy}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default MapContent;
