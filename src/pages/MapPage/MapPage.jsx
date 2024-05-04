import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import MapContent from "../../components/MapContent/MapContent";
import { useLocation, useParams } from "react-router-dom"; // 리액트 쿼리 스트링 읽어오기

// MapPage.jsx
function MapPage() {
  // 쿼리 스트링 읽어오기
  const { mode } = useParams(); // service 또는 department 읽어옴

  return (
    <div>
      <Nav />
      {/*!-- 서비스 모드, 부처별 모드로 쿼리 스트링 전달하여 MapPage로 라우터 연결까지만 완료 --*/}
      <div>{mode === "service" ? `서비스` : `부처별`}</div>
      <MapContent />
    </div>
  );
}
export default MapPage;
