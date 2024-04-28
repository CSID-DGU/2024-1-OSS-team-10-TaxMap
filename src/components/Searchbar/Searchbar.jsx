import React from "react";
import searchbarImageFilterOverlap from "../../assets/images/searchbar-image-filter-overlap.png";
//import searchbarBackgroundImg from "../../assets/images/searchbar-background-image.png";
//import searchbarBackgroundFilter from "../../assets/images/searchbar-background-image-black-filter.png";
import "./Searhbar.css";

function Searchbar() {
  return (
    <div>
      <h1>SearchBar</h1>
      <img
        src={searchbarImageFilterOverlap}
        alt="SearchBar Background Filter Overlap"
        className="searchbar-background-image"
      />
    </div>
  );
}

export default Searchbar;
