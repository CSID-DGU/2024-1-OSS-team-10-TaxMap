import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import MapPage from "./pages/MapPage/MapPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<MapPage />} />
        {/**url 파라미터 설정 */}
        <Route path="/map/:mode" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
