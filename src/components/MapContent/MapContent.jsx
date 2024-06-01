import React, { useEffect, useRef, useState } from "react";
import "./MapContent.css";
import Sidebar from "../Sidebar/Sidebar";

function MapContent({ coordinates }) {
  const mapContainerRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const closeSidebar = () => {
    setSelectedMarker(null);
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
              setMarkers(data);
              data.forEach((markerData) => {
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: new window.kakao.maps.LatLng(
                    markerData.latitude,
                    markerData.longitude
                  ),
                  title: markerData.address,
                });

                window.kakao.maps.event.addListener(
                  marker,
                  "click",
                  async () => {
                    console.log("Marker Data:", markerData);

                    const orgSubsidies = await Promise.all(
                      markerData.organizations.map(async (org) => {
                        const subsidyPromises = org.subsidies.map(
                          async (sub) => {
                            const subsidyResponse = await fetch(
                              `${process.env.REACT_APP_API_URL}/api/subsidy/${sub.id}`
                            );
                            if (subsidyResponse.ok) {
                              return await subsidyResponse.json();
                            } else {
                              throw new Error(
                                "Failed to fetch subsidy details"
                              );
                            }
                          }
                        );
                        return {
                          ...org,
                          subsidies: await Promise.all(subsidyPromises),
                        };
                      })
                    );

                    setSelectedMarker({
                      ...markerData,
                      organizations: orgSubsidies,
                    });
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
