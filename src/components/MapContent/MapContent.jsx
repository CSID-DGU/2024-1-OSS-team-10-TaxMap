import React, { useEffect, useRef, useState } from "react";
import "./MapContent.css";
import Sidebar from "../Sidebar/Sidebar";
import clicked_largest_icon from "../../assets/images/markers/marker_icon_largest_clicked.png";
import clicked_middle_icon from "../../assets/images/markers/marker_icon_middle_clicked.png";
import clicked_low_icon from "../../assets/images/markers/marker_icon_low_clicked.png";
import largest_icon from "../../assets/images/markers/marker_icon_largest.png";
import middle_icon from "../../assets/images/markers/marker_icon_middle.png";
import low_icon from "../../assets/images/markers/marker_icon_low.png";

function MapContent({ coordinates }) {
  const mapContainerRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickMarker, setClickMarker] = useState(null);

  const closeSidebar = () => {
    setSelectedMarker(null);
    setClickMarker(null);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(
            coordinates ? coordinates.lat : 37.55805491922956,
            coordinates ? coordinates.lng : 126.99832780535394
          ),
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);

        window.kakao.maps.event.addListener(map, "bounds_changed", async () => {
          const bounds = map.getBounds();
          const swLatLng = bounds.getSouthWest();
          const neLatLng = bounds.getNorthEast();

          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/api/map/view`,
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

              // 최대 보조금 기준으로 마커 이미지 설정 - maxTotalSubsidy
              const markerMap = {};
              data.forEach((marker) => {
                if (!markerMap[marker.address]) {
                  markerMap[marker.address] = marker;
                }
              });

              const expenses = Object.values(markerMap);
              setMarkers(expenses);

              expenses.forEach((markerData) => {
                let markerImage;
                //   maxTotalSubsidy 값 기준으로 마커 이미지 적용
                if (markerData.maxTotalSubsidy >= 100000000) {
                  markerImage = largest_icon;
                } else if (markerData.maxTotalSubsidy >= 50000000) {
                  markerImage = middle_icon;
                } else {
                  markerImage = low_icon;
                }

                const marker = new window.kakao.maps.Marker({
                  map: map,
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

                window.kakao.maps.event.addListener(
                  marker,
                  "click",
                  async () => {
                    if (clickMarker) {
                      const { marker: prevMarker, data: prevData } =
                        clickMarker;
                      let previousMarkerImage;
                      if (prevData.maxTotalSubsidy >= 100000000) {
                        previousMarkerImage = largest_icon;
                      } else if (prevData.maxTotalSubsidy >= 50000000) {
                        previousMarkerImage = middle_icon;
                      } else {
                        previousMarkerImage = low_icon;
                      }
                      prevMarker.setImage(
                        new window.kakao.maps.MarkerImage(
                          previousMarkerImage,
                          new window.kakao.maps.Size(24, 35)
                        )
                      );
                    }

                    let clickedMarkerImage;
                    // maxTotalSubsidy으로 마커 이미지 적용
                    if (markerData.maxTotalSubsidy >= 1500000000) {
                      clickedMarkerImage = clicked_largest_icon;
                    } else if (markerData.maxTotalSubsidy >= 70000000) {
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
                          const subsidyPromises = org.subsidies.map(
                            async (sub) => {
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
                            }
                          );
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
                  }
                );
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
      {selectedMarker && (
        <Sidebar marker={selectedMarker} onClose={closeSidebar} />
      )}
    </div>
  );
}
export default MapContent;
