import React from "react";
import searchbarImageFilterOverlap from "../../assets/images/searchbar-image-filter-overlap.png";
import searchIcon from "../../assets/images/search-icon-overlap.png";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

function Searchbar() {
  const navigate = useNavigate();

  function navigateToMapPage() {
    navigate("/map");
  }
  // 검색어 입력 후 엔터 키 쳤을 때 MapPage 이동
  function handleKeyDown(event) {
    if (event.key == "Enter") {
      navigateToMapPage();
    }
  }

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
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="search-button"
          onClick={navigateToMapPage}
        >
          <img src={searchIcon} alt="검색" className="search-button-image" />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
