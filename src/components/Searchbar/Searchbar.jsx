import React, { useState } from "react";
import searchbarImageFilterOverlap from "../../assets/images/searchbar-image-filter-overlap.png";
import searchIcon from "../../assets/images/search-icon-overlap.png";
import { useNavigate } from "react-router-dom";
import {
  fetchSuggestions,
  fetchCoordinates,
} from "../../services/suggestionService";
import "./Searchbar.css";

function Searchbar() {
  // 단어 자동 완성 기능
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // 좌표를 MapPage로 전달함수 구현 후 사용 안함
  // function navigateToMapPage() {
  //   navigate("/map");
  // }
  // 검색어 입력 후 엔터 키 쳤을 때 MapPage 이동 - 일단 사용 x
  // function handleKeyDown(event) {
  //   if (event.key == "Enter") {
  //     navigateToMapPage();
  //   }
  // }

  // 단어 자동 완성 기능 - 카카오 맵 api 이용
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 1) {
      // 백엔드 API 미구현 상태 - 사용자 입력 단어 혹은 문구와 연관된 회사명, 주소 등을 백엔드 DB로 부터 가져와 검색어 목록 자동 완성 제안
      // 카카오 맵 API 이용
      const suggestionData = await fetchSuggestions(value);
      setSuggestions(suggestionData || []);
    } else {
      setSuggestions([]);
    }
  };
  // 검색 제안 목록 렌더링
  const renderSuggestions = () => {
    return (
      suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.place_name)}
            >
              {/* 아이콘 */}
              {/* <img src="path_to_icon" alt="" className="suggestions-icon" /> */}
              <span className="suggestion-text">{suggestion.place_name}</span>
            </li>
          ))}
        </ul>
      )
    );
  };
  // 검색어 제안 클릭 핸들러
  const handleSuggestionClick = async (placeName) => {
    // 비동기 처리 이유 :
    const coordinates = await fetchCoordinates(placeName); // 사용자가 클릭한 장소의 좌표 가져오기
    if (coordinates) {
      navigate("/map", { state: { coordinates } }); // 좌표를 MapPage로 전달
    } else {
      console.error("Failed to fetch coordinates");
    }
    //navigate("/map", { state: { coordinates } });  // 수정 후
    // setInputValue(placeName); // 입력창에 검색어 설정 (수정 전)
    setSuggestions([]); // 검색어 제안 목록 숨김 (공통)
    //navigateToMapPage(); // 검색어 실행 (수정 전)
  };

  // 토클 버튼 - 사용자의 선택 저장
  const [searchOption, setSearchOption] = useState("address-building-name"); // 디폴트 : '도로명 주소, 건물이름을 알아요'

  const toggleSearchOption = () => {
    setSearchOption((prevOption) =>
      prevOption === "address-building-name"
        ? "company"
        : "address-building-name"
    );
  };
  return (
    <div
      className="searchbar-container"
      style={{ backgroundImage: `url(${searchbarImageFilterOverlap})` }}
    >
      <p className="searchbar-title">
        세금이 어디에 사용되었을까요? 찾아보세요!
      </p>
      <div className="searchbar-input-container">
        <input
          type="text"
          placeholder="공공데이터 세금 사용 지역 및 혜택정보를 한눈에 확인해 보세요"
          /*onKeyDown={handleKeyDown} */ // 버튼 클릭 없이 엔터 키만으로 지도 페이지로 이동
          onChange={handleInputChange} // 사용자 입력이 발생하면 감지 후 검색어 제안
        />
        <button
          type="submit"
          className="search-button"
          /* onClick={navigateToMapPage}*/
        >
          <img src={searchIcon} alt="검색" className="search-button-image" />
        </button>
      </div>
      {/* 검색 제안 목록 -- css 미적용*/}
      {renderSuggestions()}
      <div className="toggle-buttons-container">
        <button
          className={`toggle-button  ${
            searchOption === "address-building-name" ? "active" : ""
          }`}
          onClick={() => setSearchOption("address-building-name")}
        >
          도로명 주소, 건물 이름을 알아요
        </button>
        <button
          className={`toggle-button ${
            searchOption === "company" ? "active" : ""
          }`}
          onClick={() => setSearchOption("company")}
        >
          회사명을 알아요
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
