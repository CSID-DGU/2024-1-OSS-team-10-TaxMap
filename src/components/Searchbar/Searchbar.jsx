import React from "react";
import searchbarImageFilterOverlap from "../../assets/images/searchbar-image-filter-overlap.png";
import searchIcon from "../../assets/images/search-icon-overlap.png";
//import searchbarBackgroundImg from "../../assets/images/searchbar-background-image.png";
//import searchbarBackgroundFilter from "../../assets/images/searchbar-background-image-black-filter.png";
import "./Searchbar.css";

function Searchbar() {
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
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="검색" className="search-button-image" />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
