// 입력 검색어 제안 기능 - API 호출 관련 함수
// suggestionService.js

export const fetchSuggestions = async (keyword) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_REST_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.documents; // 카카오 API의 응답에서 실제 제안 목록을 반환
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

// 사용자가 검색 제안 목록에서 한 개 선택시 해당 좌표를 가져옴
export const fetchCoordinates = async (placeName) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        placeName
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_REST_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.documents[0]
      ? { lat: data.documents[0].y, lng: data.documents[0].x }
      : null;
  } catch (error) {
    console.log("Error fetching coordinates: ", error);
    return null; // 좌표 가져오기 오류 시 null 반환
  }
};

// 사용자가 지도 영역 옮길 때마다 지도 영역 요청
export const fetchBoundaryOrganizations = async (swLatLng, neLatLng) => {
  try {
    const response = await fetch(
      `http://124.49.226.94:9999/api/organizations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          southWest: { lat: swLatLng.getLat(), lng: swLatLng.getLng() },
          nortEast: { lat: neLatLng.getLat(), lng: neLatLng.getLng() },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }
    return await response.json(); // 백엔드로부터 받은 데이터 반환
  } catch (error) {
    console.error(
      "Error fetching organizations within bounds (경계 정보 가져오면서 오류 발생):, error "
    );
    return null; // 에러 발생 시 null 반환
  }
};
