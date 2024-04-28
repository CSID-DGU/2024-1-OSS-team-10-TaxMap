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
