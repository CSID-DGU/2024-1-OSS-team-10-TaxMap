import React, { useEffect, useRef, useState } from "react";
import "./MapContent.css";
import Sidebar from "../Sidebar/Sidebar";
import clicked_largest_icon from "../../assets/images/markers/marker_icon_largest_clicked.png";
import clicked_middle_icon from "../../assets/images/markers/marker_icon_middle_clicked.png";
import clicked_low_icon from "../../assets/images/markers/marker_icon_low_clicked.png";
import largest_icon from "../../assets/images/markers/marker_icon_largest.png";
import middle_icon from "../../assets/images/markers/marker_icon_middle_clicked.png";
import low_icon from "../../assets/images/markers/marker_icon_low.png";
import priceRangeImage from "../../assets/images/marker-price-range.png";

function MapContent({ coordinates, selectedDepartment }) {
  const mapContainerRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickMarker, setClickMarker] = useState(null);
  const mapRef = useRef(null);

  const closeSidebar = () => {
    setSelectedMarker(null);
    setClickMarker(null);
  };

  const loadMarkers = async (map) => {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const requestBody = {
      minLat: swLatLng.getLat(),
      maxLat: neLatLng.getLat(),
      minLng: swLatLng.getLng(),
      maxLng: neLatLng.getLng(),
    };

    if (selectedDepartment) {
      requestBody.govOfficeFilter = selectedDepartment;
    }

    console.log("API Request Body:", requestBody); // API 요청 본문 출력

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/map/view`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        const data = await response.json();

        console.log("API Response Data:", data); // API 응답 데이터 전체 출력

        const markerMap = {};
        data.forEach((marker) => {
          if (!markerMap[marker.address]) {
            markerMap[marker.address] = marker;
          }
        });

        const expenses = Object.values(markerMap);

        // 이전에 생성된 마커 삭제
        markers.forEach((marker) => {
          marker.setMap(null); // 기존 마커 제거
        });

        const newMarkers = [];

        // 선택된 부처에 해당하는 마커만 표시하도록 수정
        expenses.forEach((markerData) => {
          console.log("Marker Data:", markerData); // 마커 데이터 전체 로그 출력
          // 각 markerData의 organizations 배열을 통해 govOffice 필드를 확인
          const govOffice =
            markerData.organizations[0]?.subsidies[0]?.govOffice;
          console.log("Marker Data govOffice:", govOffice);

          if (!selectedDepartment || govOffice === selectedDepartment) {
            let markerImage;
            if (markerData.maxTotalSubsidy >= 100000000) {
              markerImage = largest_icon;
            } else if (markerData.maxTotalSubsidy >= 50000000) {
              markerImage = middle_icon;
            } else {
              markerImage = low_icon;
            }

            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                markerData.latitude,
                markerData.longitude
              ),
              title: markerData.address,
              image: new window.kakao.maps.MarkerImage(
                markerImage,
                new window.kakao.maps.Size(24, 35)
              ),
            });

            marker.setMap(map); // 마커를 지도에 추가

            console.log("Marker added to map:", marker); // 마커가 지도에 추가되었는지 확인

            window.kakao.maps.event.addListener(marker, "click", async () => {
              if (clickMarker) {
                const { marker: prevMarker, data: prevData } = clickMarker;
                let previousMarkerImage;
                if (prevData.maxTotalSubsidy >= 100000000) {
                  // 1억 이상 - 금색  마커
                  previousMarkerImage = largest_icon;
                } else if (prevData.maxTotalSubsidy >= 50000000) {
                  // 5천 만원 이상 - 초록색 마커
                  previousMarkerImage = middle_icon;
                } else {
                  previousMarkerImage = low_icon; // 5천 만원 미만 - 파란색 마커
                }
                prevMarker.setImage(
                  new window.kakao.maps.MarkerImage(
                    previousMarkerImage,
                    new window.kakao.maps.Size(24, 35)
                  )
                );
              }

              let clickedMarkerImage;
              if (markerData.maxTotalSubsidy >= 100000000) {
                clickedMarkerImage = clicked_largest_icon;
              } else if (markerData.maxTotalSubsidy >= 50000000) {
                clickedMarkerImage = clicked_middle_icon;
              } else {
                clickedMarkerImage = clicked_low_icon;
              }
              marker.setImage(
                new window.kakao.maps.MarkerImage(
                  clickedMarkerImage,
                  new window.kakao.maps.Size(24, 35)
                )
              );

              if (clickMarker && clickMarker.marker === marker) {
                marker.setImage(
                  new window.kakao.maps.MarkerImage(
                    markerImage,
                    new window.kakao.maps.Size(24, 35)
                  )
                );
                setClickMarker(null);
                return;
              }

              setClickMarker({ marker, data: markerData });

              console.log("Marker Data:", markerData);

              try {
                const orgSubsidies = await Promise.all(
                  markerData.organizations.map(async (org) => {
                    const subsidyPromises = org.subsidies.map(async (sub) => {
                      try {
                        const subsidyResponse = await fetch(
                          `${process.env.REACT_APP_API_URL}/api/subsidy/${sub.id}`
                        );
                        if (subsidyResponse.ok) {
                          return await subsidyResponse.json();
                        } else {
                          console.error(
                            `Failed to fetch subsidy details for subsidy ID: ${sub.id}`
                          );
                          return null;
                        }
                      } catch (subError) {
                        console.error(
                          `Error fetching subsidy details for subsidy ID: ${sub.id}`,
                          subError
                        );
                        return null;
                      }
                    });
                    return {
                      ...org,
                      subsidies: await Promise.all(subsidyPromises).then(
                        (results) => results.filter((res) => res !== null)
                      ),
                    };
                  })
                );

                setSelectedMarker({
                  ...markerData,
                  organizations: orgSubsidies,
                });
              } catch (orgError) {
                console.error(
                  "Error fetching organizations subsidies details:",
                  orgError
                );
              }
            });

            newMarkers.push(marker);
          }
        });

        setMarkers(newMarkers);
      } else {
        throw new Error("Failed to fetch markers");
      }
    } catch (error) {
      console.error("Error fetching organizations within bounds:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`; // 카카오맵 api이용한 지도 디스플레이
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(async () => {
        const options = {
          center: new window.kakao.maps.LatLng(
            coordinates.lat,
            coordinates.lng
          ),
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        mapRef.current = map;

        loadMarkers(map);

        window.kakao.maps.event.addListener(map, "bounds_changed", () =>
          // 지도 마우스로 이동시 지도의 영역 바뀜 감지
          loadMarkers(map)
        );
      });
    };
  }, [coordinates, selectedDepartment]);

  return (
    <div className="map-content">
      {" "}
      {/* 수정된 부분 시작 */}
      <div ref={mapContainerRef} className="map-container"></div>
      {selectedMarker && (
        <Sidebar marker={selectedMarker} onClose={closeSidebar} />
      )}
      <div className="price-range-legend">
        {" "}
        {/* 추가된 부분 */}
        <img src={priceRangeImage} alt="Marker Price Range" />{" "}
        {/* 추가된 부분 */}
      </div>{" "}
      {/* 수정된 부분 끝 */}
    </div>
  );
}

export default MapContent;
