// 부처별 모드 리스트 동적으로 가져옴
import axios from "axios"; // 백엔드 통신용

// 중앙부처 리스트 가져올 백엔드 api 앤드 포인트
const API_URL = `${process.env.REACT_APP_API_URL}/api/subsidy/govofficelist`;

/**
 * 부처 리스트를 가져오는 함수
 * @returns {Promise<Array>} - 부처 리스트
 */

export const getDepartments = async () => {
  try {
    console.log("Sending request to:", API_URL); // 요청 url
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response data:", data); // 응답 데이터를 로그로 확인
    return data;
  } catch (error) {
    console.log("Error fetching departments: ", error);
    throw error;
  }
};
